# Run — cartographer/ applied to koajs/ratelimit

Date: 2026-08-23
Reader: ChatGPT, temporary session, no memory of this repo or of building it.
Given: the four instruction files by URL — `cartographer/README.md`,
`cartographer/rules.md`, `cartographer/identity.md`,
`cartographer/reference/card-types.md` — and the target repo by URL.
Territory: https://github.com/koajs/ratelimit at commit `212a4ff`.

Instruction given, once, verbatim:

> Produce what the method says to produce: an inventory first, then a
> catalog, then cards. Follow the rules as written — cite file and line,
> never copy source into a card, every card carries Hits and Does not hit
> including a wrong neighbour, and mark live / leftover / ghost / drift with
> proof. Don't optimize for a good-looking result, and tell me plainly where
> the method doesn't fit this territory rather than working around it. A
> rough honest run is worth more to me than a polished one.

Nothing was uploaded. Nothing was coached. No correction was offered while
it worked.

The run is reproduced below unedited, including the point where it stopped
and declared the territory out of scope by my own rule, and the seven strain
points at the end.

---

<!-- THE FULL RUN  -->

# Inventory

I treated the four Cartographer files as controlling. That means inventory has to precede cards; every tracked file is a noun candidate; named things, decision stages, and bare numbers enter the inventory; and every noun is supposed to receive a state before any card is written. `rules.md:2-21`. 

## Sweep 1 — tracked files

The current repository has 23 tracked files. ([GitHub][1])

| Tracked file               | Last touched |
| -------------------------- | ------------ |
| `.github/workflows/ci.yml` | 2025-06-05   |
| `.husky/pre-commit`        | 2025-06-05   |
| `limiter/memory.js`        | 2025-06-05   |
| `limiter/redis.js`         | 2025-06-05   |
| `test/.eslintrc.yml`       | 2020-09-12   |
| `test/memory.spec.js`      | 2025-06-05   |
| `test/redis.spec.js`       | 2025-06-05   |
| `test/unknown.spec.js`     | 2025-06-05   |
| `.commitlintrc.js`         | 2025-06-05   |
| `.editorconfig`            | 2025-06-05   |
| `.gitattributes`           | 2025-06-05   |
| `.gitignore`               | 2020-09-12   |
| `.lintstagedrc.js`         | 2025-06-05   |
| `.npmrc`                   | 2018-04-08   |
| `.prettierrc.js`           | 2025-06-05   |
| `.remarkignore`            | 2025-06-05   |
| `.remarkrc.js`             | 2025-06-05   |
| `.xo-config.js`            | 2025-06-05   |
| `LICENSE`                  | 2020-09-12   |
| `README.md`                | 2025-06-05   |
| `example.js`               | 2025-06-05   |
| `index.js`                 | 2025-06-05   |
| `package.json`             | 2025-06-05   |

The file set itself already exposes a fit problem: Cartographer says *every tracked file* participates in inventory and later “every noun has a card,” but files such as `.editorconfig`, `.gitattributes`, `.npmrc`, and `.remarkrc.js` are read mainly by external tools through filename conventions. The repo contains configuration for those readers—for example npm configuration at `.npmrc:1`, lint-staged at `.lintstagedrc.js:1-4`, XO at `.xo-config.js:1-17`, and the CI invocation at `.github/workflows/ci.yml:1-24`—but usually does not contain the code that reads those files. 

So a repository-only reading cannot satisfy the method's definition of `live`—“named somewhere and read somewhere; both halves required”—for every tracked-file noun without importing facts about npm, Git, EditorConfig, GitHub Actions, Remark, Husky, etc. `rules.md:31-40`. 

## Sweep 2 — named things and numbers

The behavior-bearing noun candidates I get from the production surface are:

| Area                     | Noun candidates                                                                                                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| public/options           | `driver`, `db`, `duration`, `max`, `id`, `headers`, `remaining`, `reset`, `total`, `onLimited`, `whitelist`, `blacklist`, `throw`, `disableHeader`, `errorMessage`, `status`, `namespace` |
| routines/types           | exported `ratelimit`, middleware `ratelimit`, `MemoryLimiter`, `RedisLimiter`, `Limiter`, `Limiter#get`, `getMicrotime`                                                                   |
| runtime products         | request `id`, `whitelisted`, `blacklisted`, selected limiter, `limit`, `limit.remaining`, `calls`, emitted headers, `delta`, `after`, message, `ctx.state.rateLimit`                      |
| memory state             | storage key, entry, reset time, expired/not-expired decision, key-exists decision, reinitialization decision, initial counter state                                                       |
| decisions                | blacklist refusal, whitelist/id bypass, store selection, counter initialization/decrement, allow/rate-limit verdict, throw/return delivery                                                |
| obvious decision numbers | default `2500`, default `3,600,000 ms`, `403`, `429`, zero boundary                                                                                                                       |
| supporting/test numbers  | `1000`, `1`, `0`, `200`, `403`, `429`, example `60000`, `100`, ports `3000`/`4000`, time conversion factors                                                                               |

The option surface is established in `index.js:36-118`; the memory store in `limiter/memory.js:31-67`; examples/options in `README.md:34-123`. ([GitHub][2])

There is an internal methodology ambiguity here. `rules.md:9-10` says **any bare number** enters sweep 2, while `rules.md:17-21` says a noun excludes anything a reader would never search for by name. In this repo those instructions pull apart quickly: unit-conversion multipliers, example timestamps, HTTP response examples, test fixtures, CI Node version `18`, semver components, etc. are all numbers, but making a separate card for every such occurrence would mostly produce things no maintainer would search for. 

I did **not** resolve that contradiction by inventing a hidden heuristic. The inventory above keeps the decision-significant numbers and calls the rest an unresolved completeness problem.

## Sweep 3 — decision order

Walking an ordinary, non-whitelisted request through the actual middleware gives this order:

1. Produce the request identity from `id` — `index.js:58`.
2. Evaluate blacklist — `index.js:60-66`.
3. Evaluate bypass through `id === false` or whitelist — `index.js:69`.
4. Select memory or Redis implementation — `index.js:72-79`.
5. Ask the selected limiter for its current counter state — `index.js:83`.
6. Derive the displayed remaining-call count and headers — `index.js:86-99`.
7. Gate downstream execution on the limiter's `remaining` value — `index.js:103`.
8. If blocked, derive retry timing/message/state/status, run `onLimited`, optionally throw — `index.js:104-118`. ([GitHub][2])

For memory storage, step 5 expands into “find entry → decide expired/missing → initialize or decrement → return state,” `limiter/memory.js:45-67`. ([GitHub][3])

For the default Redis storage, it **cannot be expanded inside this repository**. `limiter/redis.js:1` delegates the implementation wholesale to `async-ratelimiter`, which is an external dependency declared at `package.json:13`. ([GitHub][4])

That is a major transfer failure. The default path leaves the mapped territory before the central counter decision is made.

## Sweep 4 — reconcile state

For the central behavior, these states are supportable:

| Noun                     | State     | Proof                                                                                                                                                  |
| ------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                     | live      | produced/read at `index.js:58,69`; custom/bypass behavior tested `test/memory.spec.js:143-193`                                                         |
| `blacklist`              | live      | read and immediately gates at `index.js:62-66`; tested `test/memory.spec.js:247-270`                                                                   |
| `whitelist`              | live      | read at `index.js:60-61,69`; tested `test/memory.spec.js:205-239`                                                                                      |
| `driver`                 | live      | default `index.js:38`; read/routed `index.js:59,72-79`; invalid case tested `test/unknown.spec.js:26-40`                                               |
| `max`                    | live      | default `index.js:40`; memory state consumes it `limiter/memory.js:40,55-60`; limit behavior tested `test/memory.spec.js:20-80`                        |
| `duration`               | live      | default `index.js:39`; memory reset consumes it `limiter/memory.js:41,49-52`                                                                           |
| memory limiter           | live      | selected `index.js:73-75`; its `get` result is consumed `index.js:83`                                                                                  |
| Redis limiter boundary   | live      | selected `index.js:77-79`; implementation delegated at `limiter/redis.js:1`                                                                            |
| `limit.remaining`        | live      | memory produces/updates it `limiter/memory.js:55-65`; verdict reads it `index.js:103`                                                                  |
| `calls`                  | live      | derived `index.js:86`; used for response header `index.js:90-99`                                                                                       |
| header-name option shape | **drift** | README presents `remaining/reset/total` beside top-level options `README.md:118-120`; code actually reads them inside `opts.headers`, `index.js:52-56` |
| `status` option          | **drift** | runtime reads it at `index.js:113`; API Options list `README.md:109-123` does not name it                                                              |
| `throw`                  | live      | read after rate-limit verdict `index.js:116-118`; behavior tested `test/memory.spec.js:103-135`                                                        |
| `onLimited`              | live      | defaulted `index.js:47`, invoked `index.js:115`, shown in Redis example `README.md:53-55`                                                              |

The two drift calls are not cosmetic. The README examples correctly nest header-name settings, while its Options section lists the three names at the same bullet level as top-level settings. ([GitHub][5]) `status` is an actual runtime option but is absent from that Options section. ([GitHub][2])

**Ghost: none shipped. Leftover: none shipped.** I found a tempting leftover candidate: `.remarkignore:2` still names `History.md`, which is absent from the current tree, while published older versions such as 5.0.0 did contain a `History.md`.  I am not marking it `leftover`, because proving that the current ignore entry is actually read requires Remark's external filename-convention semantics. Under the rules, a leftover needs proof, not plausibility.

That matters: I can't honestly say sweep 4 completed. Some tracked-file nouns remain unclassifiable from territory-local evidence.

---

# Strict-run result

At this point a by-the-rules Cartographer run should stop.

`rules.md:3-5` says **no card is written until the full noun list exists and every noun has a state**. `rules.md:84` says the finished map has a card for every noun.  I do not have that condition here without either:

* importing external-tool behavior,
* discarding tracked files from the inventory,
* inventing a fifth state such as `external`,
* or deciding silently which “bare numbers” do not count.

All four would change the method.

There is an even earlier objection: the methodology explicitly calls “anything small enough to simply read” out of scope, `README.md:13-20` and `identity.md:16-25`.  The decision-bearing production core here is roughly one middleware file, a 69-line memory implementation, and a one-line Redis adapter. That looks like exactly the boundary the methodology says not to map.

So everything below is a **forced transfer test, not a method-valid finished map**. I am continuing because that makes the transfer properties easier to see.

# Catalog — forced continuation

The catalog itself obeys the four-column restriction and is grouped by the derived decision order. `rules.md:71-81`.  It contains only the reconciled core above, so it is knowingly incomplete.

### Identity and early policy

| name      | what it is                       | state | card path            |
| --------- | -------------------------------- | ----- | -------------------- |
| id        | Chooses request bucket identity  | live  | `cards/id.md`        |
| blacklist | Refuses requests before limiting | live  | `cards/blacklist.md` |
| whitelist | Bypasses rate limiting           | live  | `cards/whitelist.md` |

### Store route

| name          | what it is                      | state | card path                 |
| ------------- | ------------------------------- | ----- | ------------------------- |
| driver        | Selects counter backend         | live  | `cards/driver.md`         |
| MemoryLimiter | In-process counter store        | live  | `cards/memory-limiter.md` |
| RedisLimiter  | External counter-store boundary | live  | `cards/redis-limiter.md`  |

### Counter policy and state

| name            | what it is                  | state | card path                  |
| --------------- | --------------------------- | ----- | -------------------------- |
| max             | Allowed requests per window | live  | `cards/max.md`             |
| duration        | Length of limiting window   | live  | `cards/duration.md`        |
| limit.remaining | Counter used for verdict    | live  | `cards/limit-remaining.md` |
| calls           | Counter displayed to caller | live  | `cards/calls.md`           |

### Response and API surface

| name                     | what it is                            | state | card path                      |
| ------------------------ | ------------------------------------- | ----- | ------------------------------ |
| header-name option shape | Documented header configuration shape | drift | `cards/header-option-shape.md` |
| status                   | Limited-response status option        | drift | `cards/status.md`              |
| throw                    | Chooses limited-response delivery     | live  | `cards/throw.md`               |

# Cards — forced continuation

## `cards/id.md`

**Type:** `object`
**State:** live

**What it is:** The configurable hook that chooses which identity is rate-limited.

**Why it is shaped this way:** It permits callers to partition limits on something other than the default request IP.

**Hits:** Bucket identity and therefore the key handed to the selected limiter. It also controls the explicit “false means bypass” branch. Sources: `index.js:41,58,69,73-79`.

**Does not hit:** **Wrong neighbour — `namespace`.** Both contribute to storage identity, but `namespace` only prefixes a storage key; it does not decide which request identity the application selected. Memory key construction is `limiter/memory.js:32-42`.

**Source:** `index.js:41,58,69`; `limiter/memory.js:32-42`. ([GitHub][2])

---

## `cards/blacklist.md`

**Type:** `object` *(coercion: the thing being mapped is a callback-valued option, not a named source routine)*
**State:** live

**What it is:** An application-supplied policy hook that can refuse a request before the rate counter matters.

**Why it is shaped this way:** The application owns the exclusion policy; middleware owns the refusal.

**Hits:** The early `403` refusal. Source: `index.js:62-66`.

**Does not hit:** **Wrong neighbour — `whitelist`.** A reader could assume whitelist overrides blacklist. It does not: blacklist refusal is evaluated first, and the bypass comes afterwards at `index.js:69`.

**Source:** `index.js:60-69`; behavioral coverage `test/memory.spec.js:205-270`. ([GitHub][2])

---

## `cards/whitelist.md`

**Type:** `object` *(same callback-slot coercion)*
**State:** live

**What it is:** An application-supplied hook that bypasses counter handling.

**Why it is shaped this way:** It lets application policy exempt requests without changing limiter storage.

**Hits:** Whether execution skips driver selection, counter access, and rate-limit verdict. Source: `index.js:60-61,69`.

**Does not hit:** **Wrong neighbour — `blacklist`.** It does not rescue a request already blacklisted because that refusal occurs first.

**Source:** `index.js:60-69`; `test/memory.spec.js:205-270`. ([GitHub][2])

---

## `cards/driver.md`

**Type:** `object` *(poor fit: semantically this is a routing switch; the closed card set has no switch/enum type)*
**State:** live

**What it is:** The categorical choice between the two limiter backends.

**Why it is shaped this way:** One middleware contract fronts memory and Redis storage.

**Hits:** Which limiter implementation receives the request's options and identity; unsupported values take an error path. Sources: `index.js:38,59,72-79`; `test/unknown.spec.js:26-40`.

**Does not hit:** **Wrong neighbour — `max`.** Switching stores does not by itself change the configured request allowance; the same option is passed to either constructor.

**Source:** `index.js:38,59,72-79`; `test/unknown.spec.js:26-40`. ([GitHub][2])

---

## `cards/max.md`

**Type:** `threshold`
**State:** live

**Current value:** Default `2500`. Source: `index.js:40`.

**What it is:** The configured request allowance for one identity during one window.

**Why it is shaped this way:** It is the primary human-chosen policy boundary controlling when the limiter stops permitting downstream execution.

**What it gates:** Whether stored remaining capacity eventually reaches the blocked state read by `index.js:103`.

**What moves when it moves:** The number of requests an identity can get through during a window; memory initial `remaining` and `total` also move because both originate from `max`, `limiter/memory.js:55-60`.

**Hits:** Counter initialization and later allow/block conclusions.

**What does not move / Does not hit:** **Wrong neighbour — `calls`.** `calls` resembles the limit state but is a derived response-display value; the verdict does not test it.

**If you change it:** A reader looking only at the response header may think that header count is the gate. It isn't; `limit.remaining` is.

**Source:** `index.js:40,83,86,103`; `limiter/memory.js:40,55-65`; `test/memory.spec.js:20-80`. ([GitHub][2])

This is where Cartographer transfers particularly well. `max` is almost exactly the methodology's motivating definition of a governance edge: changing it changes what conclusion is allowed without changing the flow topology. Compare `card-types.md:35-52`. 

---

## `cards/duration.md`

**Type:** `threshold` *(reasonable fit, but less clean than `max` because it governs a temporal boundary rather than a direct numerical comparison in `index.js`)*
**State:** live

**Current value:** Default `3,600,000 ms`. Source: `index.js:39`.

**What it is:** The length of the interval over which one counter state remains applicable.

**Why it is shaped this way:** Capacity has to regain validity after time passes.

**What it gates:** In the memory backend, whether an existing entry is expired and should be replaced; that replacement restores allowance.

**What moves when it moves:** The time at which a previously limited identity can again receive fresh capacity.

**Hits:** Memory reset calculation and expiry/reinitialization. Sources: `limiter/memory.js:41,49-60`.

**What does not move / Does not hit:** **Wrong neighbour — `max`.** Changing window length does not change the configured capacity of a fresh window.

**If you change it:** Retry timing and future eligibility move together, but the actual allowed-count setting does not.

**Source:** `index.js:39`; `limiter/memory.js:41,49-60`. ([GitHub][2])

---

## `cards/memory-limiter.md`

**Type:** `object` *(coercion: the source noun is a class; the closed set has no class type)*
**State:** live

**What it is:** The in-process implementation of counter storage and expiry.

**Why it is shaped this way:** It gives the middleware a storage option requiring only a `Map`.

**Hits:** Key construction, entry lookup, expiry/reinitialization, remaining-count decrement, and the state returned to the middleware. Source: `limiter/memory.js:31-67`.

**Does not hit:** **Wrong neighbour — Redis behavior.** Selecting this implementation provides no evidence about Redis atomicity, TTL handling, or concurrency because that behavior lives in another package.

**Source:** `index.js:12,73-75,83`; `limiter/memory.js:31-67`. ([GitHub][2])

---

## `cards/redis-limiter.md`

**Type:** `object`
**State:** live **at the boundary only**

**What it is:** The repository's adapter edge to the external Redis rate-limiter implementation.

**Why it is shaped this way:** This repository delegates Redis counter behavior instead of implementing it.

**Hits:** Which external constructor is instantiated and whose `get()` result enters the common verdict path. Sources: `index.js:11,77-83`; `limiter/redis.js:1`.

**Does not hit:** **Wrong neighbour — `limiter/memory.js`.** Redis requests do not pass through the local memory counter implementation.

**Source:** `index.js:11,77-83`; `limiter/redis.js:1`; dependency declaration `package.json:13`. ([GitHub][4])

This card exposes a substantive method failure: it can tell a cold reader **where the boundary is**, but not “why it is shaped this way” below that boundary or what a Redis counter change actually hits. Opening `async-ratelimiter` would mean leaving the mapped body of work. For the default driver, the map cannot be self-sufficient.

---

## `cards/limit-remaining.md`

**Type:** `computed value`
**State:** live

**What it is:** The limiter-produced capacity value that the middleware uses for its allow/block decision.

**Why it is shaped this way:** Both storage implementations present a common state interface to the middleware.

**Hits:** The central downstream-execution verdict at `index.js:103`; it also feeds calculation of the displayed remaining count at `index.js:86`.

**Does not hit:** **Wrong neighbour — `calls`.** `calls` is derived from this value, but the gate does not read `calls`.

**Source:** `index.js:83,86,103`; memory production/update at `limiter/memory.js:55-65`. ([GitHub][2])

---

## `cards/calls.md`

**Type:** `computed value`
**State:** live

**What it is:** The number reported to the caller as remaining capacity after the current request.

**Why it is shaped this way:** It makes the response representation differ by one request from the pre-verdict state supplied by the limiter.

**Hits:** The configured “remaining” response header. Source: `index.js:86,90-99`.

**Does not hit:** **Wrong neighbour — the rate-limit verdict.** The names make this easy to confuse, but downstream execution is controlled by `limit.remaining`, not `calls`.

**Source:** `index.js:83,86,90-103`; response behavior exercised in `test/memory.spec.js:47-75`. ([GitHub][2])

This card is another place the method transfers well: mandatory “Does not hit” catches a non-obvious same-vocabulary neighbour that a conventional code map could easily blur.

---

## `cards/header-option-shape.md`

**Type:** `object`
**State:** **drift**

**What it is:** The documented/configured shape for renaming rate-limit headers.

**Why it is shaped this way:** Runtime groups the three names under one header configuration object.

**Hits:** The names used when the middleware emits remaining/reset/total headers. Runtime source: `index.js:52-56,90-99`.

**Does not hit:** **Wrong neighbour — `limit.remaining`.** Renaming the response field called “remaining” does not alter the numeric counter or the verdict.

**Drift proof:** The examples nest the names under `headers`, `README.md:40-44,83-87`; the Options list presents `remaining`, `reset`, and `total` as peer bullets after `headers`, `README.md:117-120`; runtime reads them from `opts.headers`, `index.js:52-56`.

**Source:** `README.md:40-44,83-87,117-120`; `index.js:52-56,90-99`. ([GitHub][5])

---

## `cards/status.md`

**Type:** `object`
**State:** **drift**

**What it is:** An implemented option selecting the HTTP status used after a request has already been rate-limited.

**Why it is shaped this way:** It lets callers alter response semantics without changing the limiter's allow/block calculation.

**Hits:** The blocked response's status and, when throwing is enabled, the status supplied to the thrown Koa error. Source: `index.js:113,116-118`.

**Does not hit:** **Wrong neighbour — `limit.remaining`.** Changing status cannot make a blocked request permissible; the blocking conclusion has already occurred at `index.js:103`.

**Drift proof:** Runtime reads `status`, `index.js:113`; the public Options list runs from `README.md:109-123` without listing `status`.

**Source:** `index.js:103,113,116-118`; `README.md:109-123`. ([GitHub][2])

---

## `cards/throw.md`

**Type:** `object`
**State:** live

**What it is:** A post-verdict option selecting whether limited handling ends by throwing a Koa error.

**Why it is shaped this way:** It lets applications choose between a populated response and exception-style middleware control flow.

**Hits:** Error delivery after the limited response fields have been assembled. Source: `index.js:116-118`.

**Does not hit:** **Wrong neighbour — the rate-limit verdict.** `throw` is checked only after `limit.remaining` has already denied downstream execution. Turning it on cannot make an otherwise allowed request become rate-limited.

**Source:** `index.js:103,110-118`; `test/memory.spec.js:103-135`. ([GitHub][2])

# Where the method does and doesn't fit

The strongest fit is the **governance model**. `max` is a clean threshold, and `duration` is a defensible temporal threshold. The decision-order walk is also useful: it makes the blacklist-before-whitelist ordering explicit, and Hits/Does-not-hit does real work around `limit.remaining` versus `calls`. Those are better insights than a folder-oriented code tour.

The weak spots are more fundamental:

1. **The method rejects this repo by its own scope rule.** The decision core is small enough to read. Forcing cards adds navigation machinery to territory that barely needs navigation. 
2. **“Every tracked file” does not compose well with repository tooling.** A general software repo inevitably contains conventional inputs whose readers live outside the repo. The four states do not include “live through an external convention,” “external boundary,” or “cannot establish from territory.”
3. **The territory is not closed.** The default `redis` decision path moves its core counter semantics into `async-ratelimiter`. A one-card map of this repo cannot tell a reader what changing Redis counter behavior actually changes. ([GitHub][4])
4. **The six card types are too decision-analysis-specific for software structure.** A categorical routing switch (`driver`), a class (`Limiter`), and higher-order policy hooks (`blacklist`, `whitelist`, `id`) have to be called `object` even though that hides the property that matters. `function` does not fit the hooks because the method defines it as a *named routine in the source*. 
5. **The bare-number rule becomes noisy and conflicts with the noun rule.** This territory contains lots of technically bare numbers that are clearly not durable search nouns.
6. **Ghost handling contains a methodology-level inconsistency.** `rules.md:46` says every card carries Hits and Does not hit, matching your instruction; `card-types.md:62-63` says a ghost replaces Hits with Proof of absence. No proven ghost arose in this forced subset, so I did not have to silently choose between them. 
7. **Completeness and one-card locality conflict particularly hard at dependency boundaries.** Cartographer promises completeness while also budgeting catalog + collisions + one card. Here, a Redis question intrinsically wants the external package's source. The fourth-file failure test would report failure even though the software's delegation is perfectly ordinary. 

So my result is **partial transfer, not a clean transfer**. The parts centered on decisions, thresholds, wrong neighbours, and documentation drift survive well. The exhaustive inventory/state machinery and closed card ontology do not survive a small library repo with dependency boundaries and tool-convention files without either adding concepts to the method or lying about completeness.

[1]: https://github.com/koajs/ratelimit "GitHub - koajs/ratelimit: Rate limiter middleware · GitHub"
[2]: https://github.com/koajs/ratelimit/blob/master/index.js "ratelimit/index.js at master · koajs/ratelimit · GitHub"
[3]: https://github.com/koajs/ratelimit/blob/master/limiter/memory.js "ratelimit/limiter/memory.js at master · koajs/ratelimit · GitHub"
[4]: https://raw.githubusercontent.com/koajs/ratelimit/master/limiter/redis.js "raw.githubusercontent.com"
[5]: https://github.com/koajs/ratelimit/blob/master/README.md "ratelimit/README.md at master · koajs/ratelimit · GitHub"

import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_DC1HVbH2.mjs';
import { c as createInvalidVariablesError, g as getEnv$1, s as setOnSetGetEnv } from '../chunks/runtime_BY0QY6rv.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const schema = {"APPLICATION_NAME":{"context":"server","access":"secret","type":"string"},"API_KEY":{"context":"server","access":"secret","type":"string"},"SHARED_SECRET":{"context":"server","access":"secret","type":"string"},"REGISTERED_TO":{"context":"server","access":"public","type":"string"}};

function getEnvFieldType(options) {
  const optional = options.optional ? options.default !== void 0 ? false : true : false;
  let type;
  if (options.type === "enum") {
    type = options.values.map((v) => `'${v}'`).join(" | ");
  } else {
    type = options.type;
  }
  return `${type}${optional ? " | undefined" : ""}`;
}
const stringValidator = ({ max, min, length, url, includes, startsWith, endsWith }) => (input) => {
  if (typeof input !== "string") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (max !== void 0 && !(input.length <= max)) {
    errors.push("max");
  }
  if (min !== void 0 && !(input.length >= min)) {
    errors.push("min");
  }
  if (length !== void 0 && !(input.length === length)) {
    errors.push("length");
  }
  if (url !== void 0 && !URL.canParse(input)) {
    errors.push("url");
  }
  if (includes !== void 0 && !input.includes(includes)) {
    errors.push("includes");
  }
  if (startsWith !== void 0 && !input.startsWith(startsWith)) {
    errors.push("startsWith");
  }
  if (endsWith !== void 0 && !input.endsWith(endsWith)) {
    errors.push("endsWith");
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: input
  };
};
const numberValidator = ({ gt, min, lt, max, int }) => (input) => {
  const num = parseFloat(input ?? "");
  if (isNaN(num)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  const errors = [];
  if (gt !== void 0 && !(num > gt)) {
    errors.push("gt");
  }
  if (min !== void 0 && !(num >= min)) {
    errors.push("min");
  }
  if (lt !== void 0 && !(num < lt)) {
    errors.push("lt");
  }
  if (max !== void 0 && !(num <= max)) {
    errors.push("max");
  }
  if (int !== void 0) {
    const isInt = Number.isInteger(num);
    if (!(int ? isInt : !isInt)) {
      errors.push("int");
    }
  }
  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }
  return {
    ok: true,
    value: num
  };
};
const booleanValidator = (input) => {
  const bool = input === "true" ? true : input === "false" ? false : void 0;
  if (typeof bool !== "boolean") {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: bool
  };
};
const enumValidator = ({ values }) => (input) => {
  if (!(typeof input === "string" ? values.includes(input) : false)) {
    return {
      ok: false,
      errors: ["type"]
    };
  }
  return {
    ok: true,
    value: input
  };
};
function selectValidator(options) {
  switch (options.type) {
    case "string":
      return stringValidator(options);
    case "number":
      return numberValidator(options);
    case "boolean":
      return booleanValidator;
    case "enum":
      return enumValidator(options);
  }
}
function validateEnvVariable(value, options) {
  const isOptional = options.optional || options.default !== void 0;
  if (isOptional && value === void 0) {
    return {
      ok: true,
      value: options.default
    };
  }
  if (!isOptional && value === void 0) {
    return {
      ok: false,
      errors: ["missing"]
    };
  }
  return selectValidator(options)(value);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-check

// @ts-expect-error
/** @returns {string} */
// used while generating the virtual module
// biome-ignore lint/correctness/noUnusedFunctionParameters: `key` is used by the generated code
const getEnv = (key) => {
	return getEnv$1(key);
};

const _internalGetSecret = (key) => {
	const rawVariable = getEnv(key);
	const variable = rawVariable === '' ? undefined : rawVariable;
	const options = schema[key];

	const result = validateEnvVariable(variable, options);
	if (result.ok) {
		return result.value;
	}
	const type = getEnvFieldType(options);
	throw createInvalidVariablesError(key, type, result);
};

setOnSetGetEnv(() => {
	_internalGetSecret("APPLICATION_NAME");
API_KEY = _internalGetSecret("API_KEY");
_internalGetSecret("SHARED_SECRET");

});
const REGISTERED_TO = "ErrorCode0";_internalGetSecret("APPLICATION_NAME");
let API_KEY = _internalGetSecret("API_KEY");
_internalGetSecret("SHARED_SECRET");

let last_fm = {
  api_key: API_KEY,
  registered_to: REGISTERED_TO
};
function get_url(last_fm2) {
  return `https://ws.audioscrobbler.com/2.0/?api_key=${last_fm2.api_key}&format=json`;
}
async function get_tracks(last_fm2) {
  const data = await fetch(
    get_url(last_fm2) + `&method=user.getrecenttracks&user=${last_fm2.registered_to}&limit=1`
  ).then((body) => body.json());
  try {
    const track_data = data.recenttracks.track[0];
    if (data.recenttracks.track[0]["@attr"]["nowplaying"] == "true") {
      console.log(track_data);
      let images = [];
      for (let i = 0; i < track_data.image.length; i++) {
        images.push(track_data.image[i]["#text"]);
      }
      const track = {
        defined: true,
        name: track_data.name,
        artists: track_data.artist["#text"],
        images,
        album: track_data.album["#text"]
      };
      return track;
    }
  } catch {
    return {
      defined: false,
      name: "",
      artists: "",
      images: [],
      album: ""
    };
  }
  return {
    defined: false,
    name: "",
    artists: "",
    images: [],
    album: ""
  };
}

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const data = await get_tracks(last_fm);
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Astro</title>${renderHead()}</head> <body> ${renderComponent($$result, "Player", null, { "client:only": true, "track": data, "client:component-hydration": "only", "client:component-path": "/home/errorcodezero/Projects/scrobbly-doo/src/pages/player.svelte", "client:component-export": "default" })} </body></html>`;
}, "/home/errorcodezero/Projects/scrobbly-doo/src/pages/index.astro", void 0);

const $$file = "/home/errorcodezero/Projects/scrobbly-doo/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

sap.ui.define((function () { 'use strict';

    (function() {
        const env = {"NODE_ENV":"production"};
        try {
            if (process) {
                process.env = Object.assign({}, process.env);
                Object.assign(process.env, env);
                return;
            }
        } catch (e) {} // avoid ReferenceError: process is not defined
        globalThis.process = { env:env };
    })();

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var showdownExports = {};
    var showdown$1 = {
      get exports(){ return showdownExports; },
      set exports(v){ showdownExports = v; },
    };

    (function (module) {
      (function () {
        function getDefaultOpts(simple) {
          var defaultOptions = {
            omitExtraWLInCodeBlocks: {
              defaultValue: false,
              describe: "Omit the default extra whiteline added to code blocks",
              type: "boolean"
            },
            noHeaderId: {
              defaultValue: false,
              describe: "Turn on/off generated header id",
              type: "boolean"
            },
            prefixHeaderId: {
              defaultValue: false,
              describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix",
              type: "string"
            },
            rawPrefixHeaderId: {
              defaultValue: false,
              describe: "Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the \" char is used in the prefix)",
              type: "boolean"
            },
            ghCompatibleHeaderId: {
              defaultValue: false,
              describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)",
              type: "boolean"
            },
            rawHeaderId: {
              defaultValue: false,
              describe: "Remove only spaces, ' and \" from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids",
              type: "boolean"
            },
            headerLevelStart: {
              defaultValue: false,
              describe: "The header blocks level start",
              type: "integer"
            },
            parseImgDimensions: {
              defaultValue: false,
              describe: "Turn on/off image dimension parsing",
              type: "boolean"
            },
            simplifiedAutoLink: {
              defaultValue: false,
              describe: "Turn on/off GFM autolink style",
              type: "boolean"
            },
            excludeTrailingPunctuationFromURLs: {
              defaultValue: false,
              describe: "Excludes trailing punctuation from links generated with autoLinking",
              type: "boolean"
            },
            literalMidWordUnderscores: {
              defaultValue: false,
              describe: "Parse midword underscores as literal underscores",
              type: "boolean"
            },
            literalMidWordAsterisks: {
              defaultValue: false,
              describe: "Parse midword asterisks as literal asterisks",
              type: "boolean"
            },
            strikethrough: {
              defaultValue: false,
              describe: "Turn on/off strikethrough support",
              type: "boolean"
            },
            tables: {
              defaultValue: false,
              describe: "Turn on/off tables support",
              type: "boolean"
            },
            tablesHeaderId: {
              defaultValue: false,
              describe: "Add an id to table headers",
              type: "boolean"
            },
            ghCodeBlocks: {
              defaultValue: true,
              describe: "Turn on/off GFM fenced code blocks support",
              type: "boolean"
            },
            tasklists: {
              defaultValue: false,
              describe: "Turn on/off GFM tasklist support",
              type: "boolean"
            },
            smoothLivePreview: {
              defaultValue: false,
              describe: "Prevents weird effects in live previews due to incomplete input",
              type: "boolean"
            },
            smartIndentationFix: {
              defaultValue: false,
              describe: "Tries to smartly fix indentation in es6 strings",
              type: "boolean"
            },
            disableForced4SpacesIndentedSublists: {
              defaultValue: false,
              describe: "Disables the requirement of indenting nested sublists by 4 spaces",
              type: "boolean"
            },
            simpleLineBreaks: {
              defaultValue: false,
              describe: "Parses simple line breaks as <br> (GFM Style)",
              type: "boolean"
            },
            requireSpaceBeforeHeadingText: {
              defaultValue: false,
              describe: "Makes adding a space between `#` and the header text mandatory (GFM Style)",
              type: "boolean"
            },
            ghMentions: {
              defaultValue: false,
              describe: "Enables github @mentions",
              type: "boolean"
            },
            ghMentionsLink: {
              defaultValue: "https://github.com/{u}",
              describe: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.",
              type: "string"
            },
            encodeEmails: {
              defaultValue: true,
              describe: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities",
              type: "boolean"
            },
            openLinksInNewWindow: {
              defaultValue: false,
              describe: "Open all links in new windows",
              type: "boolean"
            },
            backslashEscapesHTMLTags: {
              defaultValue: false,
              describe: "Support for HTML Tag escaping. ex: <div>foo</div>",
              type: "boolean"
            },
            emoji: {
              defaultValue: false,
              describe: "Enable emoji support. Ex: `this is a :smile: emoji`",
              type: "boolean"
            },
            underline: {
              defaultValue: false,
              describe: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`",
              type: "boolean"
            },
            ellipsis: {
              defaultValue: true,
              describe: "Replaces three dots with the ellipsis unicode character",
              type: "boolean"
            },
            completeHTMLDocument: {
              defaultValue: false,
              describe: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags",
              type: "boolean"
            },
            metadata: {
              defaultValue: false,
              describe: "Enable support for document metadata (defined at the top of the document between `«««` and `»»»` or between `---` and `---`).",
              type: "boolean"
            },
            splitAdjacentBlockquotes: {
              defaultValue: false,
              describe: "Split adjacent blockquote blocks",
              type: "boolean"
            }
          };
          if (simple === false) {
            return JSON.parse(JSON.stringify(defaultOptions));
          }
          var ret = {};
          for (var opt in defaultOptions) {
            if (defaultOptions.hasOwnProperty(opt)) {
              ret[opt] = defaultOptions[opt].defaultValue;
            }
          }
          return ret;
        }
        function allOptionsOn() {
          var options = getDefaultOpts(true), ret = {};
          for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
              ret[opt] = true;
            }
          }
          return ret;
        }
        var showdown = {}, parsers = {}, extensions = {}, globalOptions = getDefaultOpts(true), setFlavor = "vanilla", flavor = {
          github: {
            omitExtraWLInCodeBlocks: true,
            simplifiedAutoLink: true,
            excludeTrailingPunctuationFromURLs: true,
            literalMidWordUnderscores: true,
            strikethrough: true,
            tables: true,
            tablesHeaderId: true,
            ghCodeBlocks: true,
            tasklists: true,
            disableForced4SpacesIndentedSublists: true,
            simpleLineBreaks: true,
            requireSpaceBeforeHeadingText: true,
            ghCompatibleHeaderId: true,
            ghMentions: true,
            backslashEscapesHTMLTags: true,
            emoji: true,
            splitAdjacentBlockquotes: true
          },
          original: {
            noHeaderId: true,
            ghCodeBlocks: false
          },
          ghost: {
            omitExtraWLInCodeBlocks: true,
            parseImgDimensions: true,
            simplifiedAutoLink: true,
            excludeTrailingPunctuationFromURLs: true,
            literalMidWordUnderscores: true,
            strikethrough: true,
            tables: true,
            tablesHeaderId: true,
            ghCodeBlocks: true,
            tasklists: true,
            smoothLivePreview: true,
            simpleLineBreaks: true,
            requireSpaceBeforeHeadingText: true,
            ghMentions: false,
            encodeEmails: true
          },
          vanilla: getDefaultOpts(true),
          allOn: allOptionsOn()
        };
        showdown.helper = {};
        showdown.extensions = {};
        showdown.setOption = function (key, value) {
          globalOptions[key] = value;
          return this;
        };
        showdown.getOption = function (key) {
          return globalOptions[key];
        };
        showdown.getOptions = function () {
          return globalOptions;
        };
        showdown.resetOptions = function () {
          globalOptions = getDefaultOpts(true);
        };
        showdown.setFlavor = function (name) {
          if (!flavor.hasOwnProperty(name)) {
            throw Error(name + " flavor was not found");
          }
          showdown.resetOptions();
          var preset = flavor[name];
          setFlavor = name;
          for (var option in preset) {
            if (preset.hasOwnProperty(option)) {
              globalOptions[option] = preset[option];
            }
          }
        };
        showdown.getFlavor = function () {
          return setFlavor;
        };
        showdown.getFlavorOptions = function (name) {
          if (flavor.hasOwnProperty(name)) {
            return flavor[name];
          }
        };
        showdown.getDefaultOptions = function (simple) {
          return getDefaultOpts(simple);
        };
        showdown.subParser = function (name, func) {
          if (showdown.helper.isString(name)) {
            if (typeof func !== "undefined") {
              parsers[name] = func;
            } else {
              if (parsers.hasOwnProperty(name)) {
                return parsers[name];
              } else {
                throw Error("SubParser named " + name + " not registered!");
              }
            }
          }
        };
        showdown.extension = function (name, ext) {
          if (!showdown.helper.isString(name)) {
            throw Error("Extension 'name' must be a string");
          }
          name = showdown.helper.stdExtName(name);
          if (showdown.helper.isUndefined(ext)) {
            if (!extensions.hasOwnProperty(name)) {
              throw Error("Extension named " + name + " is not registered!");
            }
            return extensions[name];
          } else {
            if (typeof ext === "function") {
              ext = ext();
            }
            if (!showdown.helper.isArray(ext)) {
              ext = [ext];
            }
            var validExtension = validate(ext, name);
            if (validExtension.valid) {
              extensions[name] = ext;
            } else {
              throw Error(validExtension.error);
            }
          }
        };
        showdown.getAllExtensions = function () {
          return extensions;
        };
        showdown.removeExtension = function (name) {
          delete extensions[name];
        };
        showdown.resetExtensions = function () {
          extensions = {};
        };
        function validate(extension, name) {
          var errMsg = name ? "Error in " + name + " extension->" : "Error in unnamed extension", ret = {
            valid: true,
            error: ""
          };
          if (!showdown.helper.isArray(extension)) {
            extension = [extension];
          }
          for (var i = 0; i < extension.length; ++i) {
            var baseMsg = errMsg + " sub-extension " + i + ": ", ext = extension[i];
            if (typeof ext !== "object") {
              ret.valid = false;
              ret.error = baseMsg + "must be an object, but " + typeof ext + " given";
              return ret;
            }
            if (!showdown.helper.isString(ext.type)) {
              ret.valid = false;
              ret.error = baseMsg + "property \"type\" must be a string, but " + typeof ext.type + " given";
              return ret;
            }
            var type = ext.type = ext.type.toLowerCase();
            if (type === "language") {
              type = ext.type = "lang";
            }
            if (type === "html") {
              type = ext.type = "output";
            }
            if (type !== "lang" && type !== "output" && type !== "listener") {
              ret.valid = false;
              ret.error = baseMsg + "type " + type + " is not recognized. Valid values: \"lang/language\", \"output/html\" or \"listener\"";
              return ret;
            }
            if (type === "listener") {
              if (showdown.helper.isUndefined(ext.listeners)) {
                ret.valid = false;
                ret.error = baseMsg + ". Extensions of type \"listener\" must have a property called \"listeners\"";
                return ret;
              }
            } else {
              if (showdown.helper.isUndefined(ext.filter) && showdown.helper.isUndefined(ext.regex)) {
                ret.valid = false;
                ret.error = baseMsg + type + " extensions must define either a \"regex\" property or a \"filter\" method";
                return ret;
              }
            }
            if (ext.listeners) {
              if (typeof ext.listeners !== "object") {
                ret.valid = false;
                ret.error = baseMsg + "\"listeners\" property must be an object but " + typeof ext.listeners + " given";
                return ret;
              }
              for (var ln in ext.listeners) {
                if (ext.listeners.hasOwnProperty(ln)) {
                  if (typeof ext.listeners[ln] !== "function") {
                    ret.valid = false;
                    ret.error = baseMsg + "\"listeners\" property must be an hash of [event name]: [callback]. listeners." + ln + " must be a function but " + typeof ext.listeners[ln] + " given";
                    return ret;
                  }
                }
              }
            }
            if (ext.filter) {
              if (typeof ext.filter !== "function") {
                ret.valid = false;
                ret.error = baseMsg + "\"filter\" must be a function, but " + typeof ext.filter + " given";
                return ret;
              }
            } else if (ext.regex) {
              if (showdown.helper.isString(ext.regex)) {
                ext.regex = new RegExp(ext.regex, "g");
              }
              if (!(ext.regex instanceof RegExp)) {
                ret.valid = false;
                ret.error = baseMsg + "\"regex\" property must either be a string or a RegExp object, but " + typeof ext.regex + " given";
                return ret;
              }
              if (showdown.helper.isUndefined(ext.replace)) {
                ret.valid = false;
                ret.error = baseMsg + "\"regex\" extensions must implement a replace string or function";
                return ret;
              }
            }
          }
          return ret;
        }
        showdown.validateExtension = function (ext) {
          var validateExtension = validate(ext, null);
          if (!validateExtension.valid) {
            console.warn(validateExtension.error);
            return false;
          }
          return true;
        };
        if (!showdown.hasOwnProperty("helper")) {
          showdown.helper = {};
        }
        showdown.helper.isString = function (a) {
          return typeof a === "string" || a instanceof String;
        };
        showdown.helper.isFunction = function (a) {
          var getType = {};
          return a && getType.toString.call(a) === "[object Function]";
        };
        showdown.helper.isArray = function (a) {
          return Array.isArray(a);
        };
        showdown.helper.isUndefined = function (value) {
          return typeof value === "undefined";
        };
        showdown.helper.forEach = function (obj, callback) {
          if (showdown.helper.isUndefined(obj)) {
            throw new Error("obj param is required");
          }
          if (showdown.helper.isUndefined(callback)) {
            throw new Error("callback param is required");
          }
          if (!showdown.helper.isFunction(callback)) {
            throw new Error("callback param must be a function/closure");
          }
          if (typeof obj.forEach === "function") {
            obj.forEach(callback);
          } else if (showdown.helper.isArray(obj)) {
            for (var i = 0; i < obj.length; i++) {
              callback(obj[i], i, obj);
            }
          } else if (typeof obj === "object") {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) {
                callback(obj[prop], prop, obj);
              }
            }
          } else {
            throw new Error("obj does not seem to be an array or an iterable object");
          }
        };
        showdown.helper.stdExtName = function (s) {
          return s.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
        };
        function escapeCharactersCallback(wholeMatch, m1) {
          var charCodeToEscape = m1.charCodeAt(0);
          return "¨E" + charCodeToEscape + "E";
        }
        showdown.helper.escapeCharactersCallback = escapeCharactersCallback;
        showdown.helper.escapeCharacters = function (text, charsToEscape, afterBackslash) {
          var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g, "\\$1") + "])";
          if (afterBackslash) {
            regexString = "\\\\" + regexString;
          }
          var regex = new RegExp(regexString, "g");
          text = text.replace(regex, escapeCharactersCallback);
          return text;
        };
        showdown.helper.unescapeHTMLEntities = function (txt) {
          return txt.replace(/&quot;/g, "\"").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        };
        var rgxFindMatchPos = function (str, left, right, flags) {
          var f = flags || "", g = f.indexOf("g") > -1, x = new RegExp(left + "|" + right, "g" + f.replace(/g/g, "")), l = new RegExp(left, f.replace(/g/g, "")), pos = [], t, s, m, start, end;
          do {
            t = 0;
            while (m = x.exec(str)) {
              if (l.test(m[0])) {
                if (!t++) {
                  s = x.lastIndex;
                  start = s - m[0].length;
                }
              } else if (t) {
                if (!--t) {
                  end = m.index + m[0].length;
                  var obj = {
                    left: {
                      start: start,
                      end: s
                    },
                    match: {
                      start: s,
                      end: m.index
                    },
                    right: {
                      start: m.index,
                      end: end
                    },
                    wholeMatch: {
                      start: start,
                      end: end
                    }
                  };
                  pos.push(obj);
                  if (!g) {
                    return pos;
                  }
                }
              }
            }
          } while (t && (x.lastIndex = s));
          return pos;
        };
        showdown.helper.matchRecursiveRegExp = function (str, left, right, flags) {
          var matchPos = rgxFindMatchPos(str, left, right, flags), results = [];
          for (var i = 0; i < matchPos.length; ++i) {
            results.push([str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)]);
          }
          return results;
        };
        showdown.helper.replaceRecursiveRegExp = function (str, replacement, left, right, flags) {
          if (!showdown.helper.isFunction(replacement)) {
            var repStr = replacement;
            replacement = function () {
              return repStr;
            };
          }
          var matchPos = rgxFindMatchPos(str, left, right, flags), finalStr = str, lng = matchPos.length;
          if (lng > 0) {
            var bits = [];
            if (matchPos[0].wholeMatch.start !== 0) {
              bits.push(str.slice(0, matchPos[0].wholeMatch.start));
            }
            for (var i = 0; i < lng; ++i) {
              bits.push(replacement(str.slice(matchPos[i].wholeMatch.start, matchPos[i].wholeMatch.end), str.slice(matchPos[i].match.start, matchPos[i].match.end), str.slice(matchPos[i].left.start, matchPos[i].left.end), str.slice(matchPos[i].right.start, matchPos[i].right.end)));
              if (i < lng - 1) {
                bits.push(str.slice(matchPos[i].wholeMatch.end, matchPos[i + 1].wholeMatch.start));
              }
            }
            if (matchPos[lng - 1].wholeMatch.end < str.length) {
              bits.push(str.slice(matchPos[lng - 1].wholeMatch.end));
            }
            finalStr = bits.join("");
          }
          return finalStr;
        };
        showdown.helper.regexIndexOf = function (str, regex, fromIndex) {
          if (!showdown.helper.isString(str)) {
            throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
          }
          if (regex instanceof RegExp === false) {
            throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
          }
          var indexOf = str.substring(fromIndex || 0).search(regex);
          return indexOf >= 0 ? indexOf + (fromIndex || 0) : indexOf;
        };
        showdown.helper.splitAtIndex = function (str, index) {
          if (!showdown.helper.isString(str)) {
            throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
          }
          return [str.substring(0, index), str.substring(index)];
        };
        showdown.helper.encodeEmailAddress = function (mail) {
          var encode = [function (ch) {
            return "&#" + ch.charCodeAt(0) + ";";
          }, function (ch) {
            return "&#x" + ch.charCodeAt(0).toString(16) + ";";
          }, function (ch) {
            return ch;
          }];
          mail = mail.replace(/./g, function (ch) {
            if (ch === "@") {
              ch = encode[Math.floor(Math.random() * 2)](ch);
            } else {
              var r = Math.random();
              ch = r > 0.9 ? encode[2](ch) : r > 0.45 ? encode[1](ch) : encode[0](ch);
            }
            return ch;
          });
          return mail;
        };
        showdown.helper.padEnd = function padEnd(str, targetLength, padString) {
          targetLength = targetLength >> 0;
          padString = String(padString || " ");
          if (str.length > targetLength) {
            return String(str);
          } else {
            targetLength = targetLength - str.length;
            if (targetLength > padString.length) {
              padString += padString.repeat(targetLength / padString.length);
            }
            return String(str) + padString.slice(0, targetLength);
          }
        };
        if (typeof console === "undefined") {
          console = {
            warn: function (msg) {
              alert(msg);
            },
            log: function (msg) {
              alert(msg);
            },
            error: function (msg) {
              throw msg;
            }
          };
        }
        showdown.helper.regexes = {
          asteriskDashAndColon: /([*_:~])/g
        };
        showdown.helper.emojis = {
          "+1": "👍",
          "-1": "👎",
          "100": "💯",
          "1234": "🔢",
          "1st_place_medal": "🥇",
          "2nd_place_medal": "🥈",
          "3rd_place_medal": "🥉",
          "8ball": "🎱",
          "a": "🅰️",
          "ab": "🆎",
          "abc": "🔤",
          "abcd": "🔡",
          "accept": "🉑",
          "aerial_tramway": "🚡",
          "airplane": "✈️",
          "alarm_clock": "⏰",
          "alembic": "⚗️",
          "alien": "👽",
          "ambulance": "🚑",
          "amphora": "🏺",
          "anchor": "⚓️",
          "angel": "👼",
          "anger": "💢",
          "angry": "😠",
          "anguished": "😧",
          "ant": "🐜",
          "apple": "🍎",
          "aquarius": "♒️",
          "aries": "♈️",
          "arrow_backward": "◀️",
          "arrow_double_down": "⏬",
          "arrow_double_up": "⏫",
          "arrow_down": "⬇️",
          "arrow_down_small": "🔽",
          "arrow_forward": "▶️",
          "arrow_heading_down": "⤵️",
          "arrow_heading_up": "⤴️",
          "arrow_left": "⬅️",
          "arrow_lower_left": "↙️",
          "arrow_lower_right": "↘️",
          "arrow_right": "➡️",
          "arrow_right_hook": "↪️",
          "arrow_up": "⬆️",
          "arrow_up_down": "↕️",
          "arrow_up_small": "🔼",
          "arrow_upper_left": "↖️",
          "arrow_upper_right": "↗️",
          "arrows_clockwise": "🔃",
          "arrows_counterclockwise": "🔄",
          "art": "🎨",
          "articulated_lorry": "🚛",
          "artificial_satellite": "🛰",
          "astonished": "😲",
          "athletic_shoe": "👟",
          "atm": "🏧",
          "atom_symbol": "⚛️",
          "avocado": "🥑",
          "b": "🅱️",
          "baby": "👶",
          "baby_bottle": "🍼",
          "baby_chick": "🐤",
          "baby_symbol": "🚼",
          "back": "🔙",
          "bacon": "🥓",
          "badminton": "🏸",
          "baggage_claim": "🛄",
          "baguette_bread": "🥖",
          "balance_scale": "⚖️",
          "balloon": "🎈",
          "ballot_box": "🗳",
          "ballot_box_with_check": "☑️",
          "bamboo": "🎍",
          "banana": "🍌",
          "bangbang": "‼️",
          "bank": "🏦",
          "bar_chart": "📊",
          "barber": "💈",
          "baseball": "⚾️",
          "basketball": "🏀",
          "basketball_man": "⛹️",
          "basketball_woman": "⛹️&zwj;♀️",
          "bat": "🦇",
          "bath": "🛀",
          "bathtub": "🛁",
          "battery": "🔋",
          "beach_umbrella": "🏖",
          "bear": "🐻",
          "bed": "🛏",
          "bee": "🐝",
          "beer": "🍺",
          "beers": "🍻",
          "beetle": "🐞",
          "beginner": "🔰",
          "bell": "🔔",
          "bellhop_bell": "🛎",
          "bento": "🍱",
          "biking_man": "🚴",
          "bike": "🚲",
          "biking_woman": "🚴&zwj;♀️",
          "bikini": "👙",
          "biohazard": "☣️",
          "bird": "🐦",
          "birthday": "🎂",
          "black_circle": "⚫️",
          "black_flag": "🏴",
          "black_heart": "🖤",
          "black_joker": "🃏",
          "black_large_square": "⬛️",
          "black_medium_small_square": "◾️",
          "black_medium_square": "◼️",
          "black_nib": "✒️",
          "black_small_square": "▪️",
          "black_square_button": "🔲",
          "blonde_man": "👱",
          "blonde_woman": "👱&zwj;♀️",
          "blossom": "🌼",
          "blowfish": "🐡",
          "blue_book": "📘",
          "blue_car": "🚙",
          "blue_heart": "💙",
          "blush": "😊",
          "boar": "🐗",
          "boat": "⛵️",
          "bomb": "💣",
          "book": "📖",
          "bookmark": "🔖",
          "bookmark_tabs": "📑",
          "books": "📚",
          "boom": "💥",
          "boot": "👢",
          "bouquet": "💐",
          "bowing_man": "🙇",
          "bow_and_arrow": "🏹",
          "bowing_woman": "🙇&zwj;♀️",
          "bowling": "🎳",
          "boxing_glove": "🥊",
          "boy": "👦",
          "bread": "🍞",
          "bride_with_veil": "👰",
          "bridge_at_night": "🌉",
          "briefcase": "💼",
          "broken_heart": "💔",
          "bug": "🐛",
          "building_construction": "🏗",
          "bulb": "💡",
          "bullettrain_front": "🚅",
          "bullettrain_side": "🚄",
          "burrito": "🌯",
          "bus": "🚌",
          "business_suit_levitating": "🕴",
          "busstop": "🚏",
          "bust_in_silhouette": "👤",
          "busts_in_silhouette": "👥",
          "butterfly": "🦋",
          "cactus": "🌵",
          "cake": "🍰",
          "calendar": "📆",
          "call_me_hand": "🤙",
          "calling": "📲",
          "camel": "🐫",
          "camera": "📷",
          "camera_flash": "📸",
          "camping": "🏕",
          "cancer": "♋️",
          "candle": "🕯",
          "candy": "🍬",
          "canoe": "🛶",
          "capital_abcd": "🔠",
          "capricorn": "♑️",
          "car": "🚗",
          "card_file_box": "🗃",
          "card_index": "📇",
          "card_index_dividers": "🗂",
          "carousel_horse": "🎠",
          "carrot": "🥕",
          "cat": "🐱",
          "cat2": "🐈",
          "cd": "💿",
          "chains": "⛓",
          "champagne": "🍾",
          "chart": "💹",
          "chart_with_downwards_trend": "📉",
          "chart_with_upwards_trend": "📈",
          "checkered_flag": "🏁",
          "cheese": "🧀",
          "cherries": "🍒",
          "cherry_blossom": "🌸",
          "chestnut": "🌰",
          "chicken": "🐔",
          "children_crossing": "🚸",
          "chipmunk": "🐿",
          "chocolate_bar": "🍫",
          "christmas_tree": "🎄",
          "church": "⛪️",
          "cinema": "🎦",
          "circus_tent": "🎪",
          "city_sunrise": "🌇",
          "city_sunset": "🌆",
          "cityscape": "🏙",
          "cl": "🆑",
          "clamp": "🗜",
          "clap": "👏",
          "clapper": "🎬",
          "classical_building": "🏛",
          "clinking_glasses": "🥂",
          "clipboard": "📋",
          "clock1": "🕐",
          "clock10": "🕙",
          "clock1030": "🕥",
          "clock11": "🕚",
          "clock1130": "🕦",
          "clock12": "🕛",
          "clock1230": "🕧",
          "clock130": "🕜",
          "clock2": "🕑",
          "clock230": "🕝",
          "clock3": "🕒",
          "clock330": "🕞",
          "clock4": "🕓",
          "clock430": "🕟",
          "clock5": "🕔",
          "clock530": "🕠",
          "clock6": "🕕",
          "clock630": "🕡",
          "clock7": "🕖",
          "clock730": "🕢",
          "clock8": "🕗",
          "clock830": "🕣",
          "clock9": "🕘",
          "clock930": "🕤",
          "closed_book": "📕",
          "closed_lock_with_key": "🔐",
          "closed_umbrella": "🌂",
          "cloud": "☁️",
          "cloud_with_lightning": "🌩",
          "cloud_with_lightning_and_rain": "⛈",
          "cloud_with_rain": "🌧",
          "cloud_with_snow": "🌨",
          "clown_face": "🤡",
          "clubs": "♣️",
          "cocktail": "🍸",
          "coffee": "☕️",
          "coffin": "⚰️",
          "cold_sweat": "😰",
          "comet": "☄️",
          "computer": "💻",
          "computer_mouse": "🖱",
          "confetti_ball": "🎊",
          "confounded": "😖",
          "confused": "😕",
          "congratulations": "㊗️",
          "construction": "🚧",
          "construction_worker_man": "👷",
          "construction_worker_woman": "👷&zwj;♀️",
          "control_knobs": "🎛",
          "convenience_store": "🏪",
          "cookie": "🍪",
          "cool": "🆒",
          "policeman": "👮",
          "copyright": "©️",
          "corn": "🌽",
          "couch_and_lamp": "🛋",
          "couple": "👫",
          "couple_with_heart_woman_man": "💑",
          "couple_with_heart_man_man": "👨&zwj;❤️&zwj;👨",
          "couple_with_heart_woman_woman": "👩&zwj;❤️&zwj;👩",
          "couplekiss_man_man": "👨&zwj;❤️&zwj;💋&zwj;👨",
          "couplekiss_man_woman": "💏",
          "couplekiss_woman_woman": "👩&zwj;❤️&zwj;💋&zwj;👩",
          "cow": "🐮",
          "cow2": "🐄",
          "cowboy_hat_face": "🤠",
          "crab": "🦀",
          "crayon": "🖍",
          "credit_card": "💳",
          "crescent_moon": "🌙",
          "cricket": "🏏",
          "crocodile": "🐊",
          "croissant": "🥐",
          "crossed_fingers": "🤞",
          "crossed_flags": "🎌",
          "crossed_swords": "⚔️",
          "crown": "👑",
          "cry": "😢",
          "crying_cat_face": "😿",
          "crystal_ball": "🔮",
          "cucumber": "🥒",
          "cupid": "💘",
          "curly_loop": "➰",
          "currency_exchange": "💱",
          "curry": "🍛",
          "custard": "🍮",
          "customs": "🛃",
          "cyclone": "🌀",
          "dagger": "🗡",
          "dancer": "💃",
          "dancing_women": "👯",
          "dancing_men": "👯&zwj;♂️",
          "dango": "🍡",
          "dark_sunglasses": "🕶",
          "dart": "🎯",
          "dash": "💨",
          "date": "📅",
          "deciduous_tree": "🌳",
          "deer": "🦌",
          "department_store": "🏬",
          "derelict_house": "🏚",
          "desert": "🏜",
          "desert_island": "🏝",
          "desktop_computer": "🖥",
          "male_detective": "🕵️",
          "diamond_shape_with_a_dot_inside": "💠",
          "diamonds": "♦️",
          "disappointed": "😞",
          "disappointed_relieved": "😥",
          "dizzy": "💫",
          "dizzy_face": "😵",
          "do_not_litter": "🚯",
          "dog": "🐶",
          "dog2": "🐕",
          "dollar": "💵",
          "dolls": "🎎",
          "dolphin": "🐬",
          "door": "🚪",
          "doughnut": "🍩",
          "dove": "🕊",
          "dragon": "🐉",
          "dragon_face": "🐲",
          "dress": "👗",
          "dromedary_camel": "🐪",
          "drooling_face": "🤤",
          "droplet": "💧",
          "drum": "🥁",
          "duck": "🦆",
          "dvd": "📀",
          "e-mail": "📧",
          "eagle": "🦅",
          "ear": "👂",
          "ear_of_rice": "🌾",
          "earth_africa": "🌍",
          "earth_americas": "🌎",
          "earth_asia": "🌏",
          "egg": "🥚",
          "eggplant": "🍆",
          "eight_pointed_black_star": "✴️",
          "eight_spoked_asterisk": "✳️",
          "electric_plug": "🔌",
          "elephant": "🐘",
          "email": "✉️",
          "end": "🔚",
          "envelope_with_arrow": "📩",
          "euro": "💶",
          "european_castle": "🏰",
          "european_post_office": "🏤",
          "evergreen_tree": "🌲",
          "exclamation": "❗️",
          "expressionless": "😑",
          "eye": "👁",
          "eye_speech_bubble": "👁&zwj;🗨",
          "eyeglasses": "👓",
          "eyes": "👀",
          "face_with_head_bandage": "🤕",
          "face_with_thermometer": "🤒",
          "fist_oncoming": "👊",
          "factory": "🏭",
          "fallen_leaf": "🍂",
          "family_man_woman_boy": "👪",
          "family_man_boy": "👨&zwj;👦",
          "family_man_boy_boy": "👨&zwj;👦&zwj;👦",
          "family_man_girl": "👨&zwj;👧",
          "family_man_girl_boy": "👨&zwj;👧&zwj;👦",
          "family_man_girl_girl": "👨&zwj;👧&zwj;👧",
          "family_man_man_boy": "👨&zwj;👨&zwj;👦",
          "family_man_man_boy_boy": "👨&zwj;👨&zwj;👦&zwj;👦",
          "family_man_man_girl": "👨&zwj;👨&zwj;👧",
          "family_man_man_girl_boy": "👨&zwj;👨&zwj;👧&zwj;👦",
          "family_man_man_girl_girl": "👨&zwj;👨&zwj;👧&zwj;👧",
          "family_man_woman_boy_boy": "👨&zwj;👩&zwj;👦&zwj;👦",
          "family_man_woman_girl": "👨&zwj;👩&zwj;👧",
          "family_man_woman_girl_boy": "👨&zwj;👩&zwj;👧&zwj;👦",
          "family_man_woman_girl_girl": "👨&zwj;👩&zwj;👧&zwj;👧",
          "family_woman_boy": "👩&zwj;👦",
          "family_woman_boy_boy": "👩&zwj;👦&zwj;👦",
          "family_woman_girl": "👩&zwj;👧",
          "family_woman_girl_boy": "👩&zwj;👧&zwj;👦",
          "family_woman_girl_girl": "👩&zwj;👧&zwj;👧",
          "family_woman_woman_boy": "👩&zwj;👩&zwj;👦",
          "family_woman_woman_boy_boy": "👩&zwj;👩&zwj;👦&zwj;👦",
          "family_woman_woman_girl": "👩&zwj;👩&zwj;👧",
          "family_woman_woman_girl_boy": "👩&zwj;👩&zwj;👧&zwj;👦",
          "family_woman_woman_girl_girl": "👩&zwj;👩&zwj;👧&zwj;👧",
          "fast_forward": "⏩",
          "fax": "📠",
          "fearful": "😨",
          "feet": "🐾",
          "female_detective": "🕵️&zwj;♀️",
          "ferris_wheel": "🎡",
          "ferry": "⛴",
          "field_hockey": "🏑",
          "file_cabinet": "🗄",
          "file_folder": "📁",
          "film_projector": "📽",
          "film_strip": "🎞",
          "fire": "🔥",
          "fire_engine": "🚒",
          "fireworks": "🎆",
          "first_quarter_moon": "🌓",
          "first_quarter_moon_with_face": "🌛",
          "fish": "🐟",
          "fish_cake": "🍥",
          "fishing_pole_and_fish": "🎣",
          "fist_raised": "✊",
          "fist_left": "🤛",
          "fist_right": "🤜",
          "flags": "🎏",
          "flashlight": "🔦",
          "fleur_de_lis": "⚜️",
          "flight_arrival": "🛬",
          "flight_departure": "🛫",
          "floppy_disk": "💾",
          "flower_playing_cards": "🎴",
          "flushed": "😳",
          "fog": "🌫",
          "foggy": "🌁",
          "football": "🏈",
          "footprints": "👣",
          "fork_and_knife": "🍴",
          "fountain": "⛲️",
          "fountain_pen": "🖋",
          "four_leaf_clover": "🍀",
          "fox_face": "🦊",
          "framed_picture": "🖼",
          "free": "🆓",
          "fried_egg": "🍳",
          "fried_shrimp": "🍤",
          "fries": "🍟",
          "frog": "🐸",
          "frowning": "😦",
          "frowning_face": "☹️",
          "frowning_man": "🙍&zwj;♂️",
          "frowning_woman": "🙍",
          "middle_finger": "🖕",
          "fuelpump": "⛽️",
          "full_moon": "🌕",
          "full_moon_with_face": "🌝",
          "funeral_urn": "⚱️",
          "game_die": "🎲",
          "gear": "⚙️",
          "gem": "💎",
          "gemini": "♊️",
          "ghost": "👻",
          "gift": "🎁",
          "gift_heart": "💝",
          "girl": "👧",
          "globe_with_meridians": "🌐",
          "goal_net": "🥅",
          "goat": "🐐",
          "golf": "⛳️",
          "golfing_man": "🏌️",
          "golfing_woman": "🏌️&zwj;♀️",
          "gorilla": "🦍",
          "grapes": "🍇",
          "green_apple": "🍏",
          "green_book": "📗",
          "green_heart": "💚",
          "green_salad": "🥗",
          "grey_exclamation": "❕",
          "grey_question": "❔",
          "grimacing": "😬",
          "grin": "😁",
          "grinning": "😀",
          "guardsman": "💂",
          "guardswoman": "💂&zwj;♀️",
          "guitar": "🎸",
          "gun": "🔫",
          "haircut_woman": "💇",
          "haircut_man": "💇&zwj;♂️",
          "hamburger": "🍔",
          "hammer": "🔨",
          "hammer_and_pick": "⚒",
          "hammer_and_wrench": "🛠",
          "hamster": "🐹",
          "hand": "✋",
          "handbag": "👜",
          "handshake": "🤝",
          "hankey": "💩",
          "hatched_chick": "🐥",
          "hatching_chick": "🐣",
          "headphones": "🎧",
          "hear_no_evil": "🙉",
          "heart": "❤️",
          "heart_decoration": "💟",
          "heart_eyes": "😍",
          "heart_eyes_cat": "😻",
          "heartbeat": "💓",
          "heartpulse": "💗",
          "hearts": "♥️",
          "heavy_check_mark": "✔️",
          "heavy_division_sign": "➗",
          "heavy_dollar_sign": "💲",
          "heavy_heart_exclamation": "❣️",
          "heavy_minus_sign": "➖",
          "heavy_multiplication_x": "✖️",
          "heavy_plus_sign": "➕",
          "helicopter": "🚁",
          "herb": "🌿",
          "hibiscus": "🌺",
          "high_brightness": "🔆",
          "high_heel": "👠",
          "hocho": "🔪",
          "hole": "🕳",
          "honey_pot": "🍯",
          "horse": "🐴",
          "horse_racing": "🏇",
          "hospital": "🏥",
          "hot_pepper": "🌶",
          "hotdog": "🌭",
          "hotel": "🏨",
          "hotsprings": "♨️",
          "hourglass": "⌛️",
          "hourglass_flowing_sand": "⏳",
          "house": "🏠",
          "house_with_garden": "🏡",
          "houses": "🏘",
          "hugs": "🤗",
          "hushed": "😯",
          "ice_cream": "🍨",
          "ice_hockey": "🏒",
          "ice_skate": "⛸",
          "icecream": "🍦",
          "id": "🆔",
          "ideograph_advantage": "🉐",
          "imp": "👿",
          "inbox_tray": "📥",
          "incoming_envelope": "📨",
          "tipping_hand_woman": "💁",
          "information_source": "ℹ️",
          "innocent": "😇",
          "interrobang": "⁉️",
          "iphone": "📱",
          "izakaya_lantern": "🏮",
          "jack_o_lantern": "🎃",
          "japan": "🗾",
          "japanese_castle": "🏯",
          "japanese_goblin": "👺",
          "japanese_ogre": "👹",
          "jeans": "👖",
          "joy": "😂",
          "joy_cat": "😹",
          "joystick": "🕹",
          "kaaba": "🕋",
          "key": "🔑",
          "keyboard": "⌨️",
          "keycap_ten": "🔟",
          "kick_scooter": "🛴",
          "kimono": "👘",
          "kiss": "💋",
          "kissing": "😗",
          "kissing_cat": "😽",
          "kissing_closed_eyes": "😚",
          "kissing_heart": "😘",
          "kissing_smiling_eyes": "😙",
          "kiwi_fruit": "🥝",
          "koala": "🐨",
          "koko": "🈁",
          "label": "🏷",
          "large_blue_circle": "🔵",
          "large_blue_diamond": "🔷",
          "large_orange_diamond": "🔶",
          "last_quarter_moon": "🌗",
          "last_quarter_moon_with_face": "🌜",
          "latin_cross": "✝️",
          "laughing": "😆",
          "leaves": "🍃",
          "ledger": "📒",
          "left_luggage": "🛅",
          "left_right_arrow": "↔️",
          "leftwards_arrow_with_hook": "↩️",
          "lemon": "🍋",
          "leo": "♌️",
          "leopard": "🐆",
          "level_slider": "🎚",
          "libra": "♎️",
          "light_rail": "🚈",
          "link": "🔗",
          "lion": "🦁",
          "lips": "👄",
          "lipstick": "💄",
          "lizard": "🦎",
          "lock": "🔒",
          "lock_with_ink_pen": "🔏",
          "lollipop": "🍭",
          "loop": "➿",
          "loud_sound": "🔊",
          "loudspeaker": "📢",
          "love_hotel": "🏩",
          "love_letter": "💌",
          "low_brightness": "🔅",
          "lying_face": "🤥",
          "m": "Ⓜ️",
          "mag": "🔍",
          "mag_right": "🔎",
          "mahjong": "🀄️",
          "mailbox": "📫",
          "mailbox_closed": "📪",
          "mailbox_with_mail": "📬",
          "mailbox_with_no_mail": "📭",
          "man": "👨",
          "man_artist": "👨&zwj;🎨",
          "man_astronaut": "👨&zwj;🚀",
          "man_cartwheeling": "🤸&zwj;♂️",
          "man_cook": "👨&zwj;🍳",
          "man_dancing": "🕺",
          "man_facepalming": "🤦&zwj;♂️",
          "man_factory_worker": "👨&zwj;🏭",
          "man_farmer": "👨&zwj;🌾",
          "man_firefighter": "👨&zwj;🚒",
          "man_health_worker": "👨&zwj;⚕️",
          "man_in_tuxedo": "🤵",
          "man_judge": "👨&zwj;⚖️",
          "man_juggling": "🤹&zwj;♂️",
          "man_mechanic": "👨&zwj;🔧",
          "man_office_worker": "👨&zwj;💼",
          "man_pilot": "👨&zwj;✈️",
          "man_playing_handball": "🤾&zwj;♂️",
          "man_playing_water_polo": "🤽&zwj;♂️",
          "man_scientist": "👨&zwj;🔬",
          "man_shrugging": "🤷&zwj;♂️",
          "man_singer": "👨&zwj;🎤",
          "man_student": "👨&zwj;🎓",
          "man_teacher": "👨&zwj;🏫",
          "man_technologist": "👨&zwj;💻",
          "man_with_gua_pi_mao": "👲",
          "man_with_turban": "👳",
          "tangerine": "🍊",
          "mans_shoe": "👞",
          "mantelpiece_clock": "🕰",
          "maple_leaf": "🍁",
          "martial_arts_uniform": "🥋",
          "mask": "😷",
          "massage_woman": "💆",
          "massage_man": "💆&zwj;♂️",
          "meat_on_bone": "🍖",
          "medal_military": "🎖",
          "medal_sports": "🏅",
          "mega": "📣",
          "melon": "🍈",
          "memo": "📝",
          "men_wrestling": "🤼&zwj;♂️",
          "menorah": "🕎",
          "mens": "🚹",
          "metal": "🤘",
          "metro": "🚇",
          "microphone": "🎤",
          "microscope": "🔬",
          "milk_glass": "🥛",
          "milky_way": "🌌",
          "minibus": "🚐",
          "minidisc": "💽",
          "mobile_phone_off": "📴",
          "money_mouth_face": "🤑",
          "money_with_wings": "💸",
          "moneybag": "💰",
          "monkey": "🐒",
          "monkey_face": "🐵",
          "monorail": "🚝",
          "moon": "🌔",
          "mortar_board": "🎓",
          "mosque": "🕌",
          "motor_boat": "🛥",
          "motor_scooter": "🛵",
          "motorcycle": "🏍",
          "motorway": "🛣",
          "mount_fuji": "🗻",
          "mountain": "⛰",
          "mountain_biking_man": "🚵",
          "mountain_biking_woman": "🚵&zwj;♀️",
          "mountain_cableway": "🚠",
          "mountain_railway": "🚞",
          "mountain_snow": "🏔",
          "mouse": "🐭",
          "mouse2": "🐁",
          "movie_camera": "🎥",
          "moyai": "🗿",
          "mrs_claus": "🤶",
          "muscle": "💪",
          "mushroom": "🍄",
          "musical_keyboard": "🎹",
          "musical_note": "🎵",
          "musical_score": "🎼",
          "mute": "🔇",
          "nail_care": "💅",
          "name_badge": "📛",
          "national_park": "🏞",
          "nauseated_face": "🤢",
          "necktie": "👔",
          "negative_squared_cross_mark": "❎",
          "nerd_face": "🤓",
          "neutral_face": "😐",
          "new": "🆕",
          "new_moon": "🌑",
          "new_moon_with_face": "🌚",
          "newspaper": "📰",
          "newspaper_roll": "🗞",
          "next_track_button": "⏭",
          "ng": "🆖",
          "no_good_man": "🙅&zwj;♂️",
          "no_good_woman": "🙅",
          "night_with_stars": "🌃",
          "no_bell": "🔕",
          "no_bicycles": "🚳",
          "no_entry": "⛔️",
          "no_entry_sign": "🚫",
          "no_mobile_phones": "📵",
          "no_mouth": "😶",
          "no_pedestrians": "🚷",
          "no_smoking": "🚭",
          "non-potable_water": "🚱",
          "nose": "👃",
          "notebook": "📓",
          "notebook_with_decorative_cover": "📔",
          "notes": "🎶",
          "nut_and_bolt": "🔩",
          "o": "⭕️",
          "o2": "🅾️",
          "ocean": "🌊",
          "octopus": "🐙",
          "oden": "🍢",
          "office": "🏢",
          "oil_drum": "🛢",
          "ok": "🆗",
          "ok_hand": "👌",
          "ok_man": "🙆&zwj;♂️",
          "ok_woman": "🙆",
          "old_key": "🗝",
          "older_man": "👴",
          "older_woman": "👵",
          "om": "🕉",
          "on": "🔛",
          "oncoming_automobile": "🚘",
          "oncoming_bus": "🚍",
          "oncoming_police_car": "🚔",
          "oncoming_taxi": "🚖",
          "open_file_folder": "📂",
          "open_hands": "👐",
          "open_mouth": "😮",
          "open_umbrella": "☂️",
          "ophiuchus": "⛎",
          "orange_book": "📙",
          "orthodox_cross": "☦️",
          "outbox_tray": "📤",
          "owl": "🦉",
          "ox": "🐂",
          "package": "📦",
          "page_facing_up": "📄",
          "page_with_curl": "📃",
          "pager": "📟",
          "paintbrush": "🖌",
          "palm_tree": "🌴",
          "pancakes": "🥞",
          "panda_face": "🐼",
          "paperclip": "📎",
          "paperclips": "🖇",
          "parasol_on_ground": "⛱",
          "parking": "🅿️",
          "part_alternation_mark": "〽️",
          "partly_sunny": "⛅️",
          "passenger_ship": "🛳",
          "passport_control": "🛂",
          "pause_button": "⏸",
          "peace_symbol": "☮️",
          "peach": "🍑",
          "peanuts": "🥜",
          "pear": "🍐",
          "pen": "🖊",
          "pencil2": "✏️",
          "penguin": "🐧",
          "pensive": "😔",
          "performing_arts": "🎭",
          "persevere": "😣",
          "person_fencing": "🤺",
          "pouting_woman": "🙎",
          "phone": "☎️",
          "pick": "⛏",
          "pig": "🐷",
          "pig2": "🐖",
          "pig_nose": "🐽",
          "pill": "💊",
          "pineapple": "🍍",
          "ping_pong": "🏓",
          "pisces": "♓️",
          "pizza": "🍕",
          "place_of_worship": "🛐",
          "plate_with_cutlery": "🍽",
          "play_or_pause_button": "⏯",
          "point_down": "👇",
          "point_left": "👈",
          "point_right": "👉",
          "point_up": "☝️",
          "point_up_2": "👆",
          "police_car": "🚓",
          "policewoman": "👮&zwj;♀️",
          "poodle": "🐩",
          "popcorn": "🍿",
          "post_office": "🏣",
          "postal_horn": "📯",
          "postbox": "📮",
          "potable_water": "🚰",
          "potato": "🥔",
          "pouch": "👝",
          "poultry_leg": "🍗",
          "pound": "💷",
          "rage": "😡",
          "pouting_cat": "😾",
          "pouting_man": "🙎&zwj;♂️",
          "pray": "🙏",
          "prayer_beads": "📿",
          "pregnant_woman": "🤰",
          "previous_track_button": "⏮",
          "prince": "🤴",
          "princess": "👸",
          "printer": "🖨",
          "purple_heart": "💜",
          "purse": "👛",
          "pushpin": "📌",
          "put_litter_in_its_place": "🚮",
          "question": "❓",
          "rabbit": "🐰",
          "rabbit2": "🐇",
          "racehorse": "🐎",
          "racing_car": "🏎",
          "radio": "📻",
          "radio_button": "🔘",
          "radioactive": "☢️",
          "railway_car": "🚃",
          "railway_track": "🛤",
          "rainbow": "🌈",
          "rainbow_flag": "🏳️&zwj;🌈",
          "raised_back_of_hand": "🤚",
          "raised_hand_with_fingers_splayed": "🖐",
          "raised_hands": "🙌",
          "raising_hand_woman": "🙋",
          "raising_hand_man": "🙋&zwj;♂️",
          "ram": "🐏",
          "ramen": "🍜",
          "rat": "🐀",
          "record_button": "⏺",
          "recycle": "♻️",
          "red_circle": "🔴",
          "registered": "®️",
          "relaxed": "☺️",
          "relieved": "😌",
          "reminder_ribbon": "🎗",
          "repeat": "🔁",
          "repeat_one": "🔂",
          "rescue_worker_helmet": "⛑",
          "restroom": "🚻",
          "revolving_hearts": "💞",
          "rewind": "⏪",
          "rhinoceros": "🦏",
          "ribbon": "🎀",
          "rice": "🍚",
          "rice_ball": "🍙",
          "rice_cracker": "🍘",
          "rice_scene": "🎑",
          "right_anger_bubble": "🗯",
          "ring": "💍",
          "robot": "🤖",
          "rocket": "🚀",
          "rofl": "🤣",
          "roll_eyes": "🙄",
          "roller_coaster": "🎢",
          "rooster": "🐓",
          "rose": "🌹",
          "rosette": "🏵",
          "rotating_light": "🚨",
          "round_pushpin": "📍",
          "rowing_man": "🚣",
          "rowing_woman": "🚣&zwj;♀️",
          "rugby_football": "🏉",
          "running_man": "🏃",
          "running_shirt_with_sash": "🎽",
          "running_woman": "🏃&zwj;♀️",
          "sa": "🈂️",
          "sagittarius": "♐️",
          "sake": "🍶",
          "sandal": "👡",
          "santa": "🎅",
          "satellite": "📡",
          "saxophone": "🎷",
          "school": "🏫",
          "school_satchel": "🎒",
          "scissors": "✂️",
          "scorpion": "🦂",
          "scorpius": "♏️",
          "scream": "😱",
          "scream_cat": "🙀",
          "scroll": "📜",
          "seat": "💺",
          "secret": "㊙️",
          "see_no_evil": "🙈",
          "seedling": "🌱",
          "selfie": "🤳",
          "shallow_pan_of_food": "🥘",
          "shamrock": "☘️",
          "shark": "🦈",
          "shaved_ice": "🍧",
          "sheep": "🐑",
          "shell": "🐚",
          "shield": "🛡",
          "shinto_shrine": "⛩",
          "ship": "🚢",
          "shirt": "👕",
          "shopping": "🛍",
          "shopping_cart": "🛒",
          "shower": "🚿",
          "shrimp": "🦐",
          "signal_strength": "📶",
          "six_pointed_star": "🔯",
          "ski": "🎿",
          "skier": "⛷",
          "skull": "💀",
          "skull_and_crossbones": "☠️",
          "sleeping": "😴",
          "sleeping_bed": "🛌",
          "sleepy": "😪",
          "slightly_frowning_face": "🙁",
          "slightly_smiling_face": "🙂",
          "slot_machine": "🎰",
          "small_airplane": "🛩",
          "small_blue_diamond": "🔹",
          "small_orange_diamond": "🔸",
          "small_red_triangle": "🔺",
          "small_red_triangle_down": "🔻",
          "smile": "😄",
          "smile_cat": "😸",
          "smiley": "😃",
          "smiley_cat": "😺",
          "smiling_imp": "😈",
          "smirk": "😏",
          "smirk_cat": "😼",
          "smoking": "🚬",
          "snail": "🐌",
          "snake": "🐍",
          "sneezing_face": "🤧",
          "snowboarder": "🏂",
          "snowflake": "❄️",
          "snowman": "⛄️",
          "snowman_with_snow": "☃️",
          "sob": "😭",
          "soccer": "⚽️",
          "soon": "🔜",
          "sos": "🆘",
          "sound": "🔉",
          "space_invader": "👾",
          "spades": "♠️",
          "spaghetti": "🍝",
          "sparkle": "❇️",
          "sparkler": "🎇",
          "sparkles": "✨",
          "sparkling_heart": "💖",
          "speak_no_evil": "🙊",
          "speaker": "🔈",
          "speaking_head": "🗣",
          "speech_balloon": "💬",
          "speedboat": "🚤",
          "spider": "🕷",
          "spider_web": "🕸",
          "spiral_calendar": "🗓",
          "spiral_notepad": "🗒",
          "spoon": "🥄",
          "squid": "🦑",
          "stadium": "🏟",
          "star": "⭐️",
          "star2": "🌟",
          "star_and_crescent": "☪️",
          "star_of_david": "✡️",
          "stars": "🌠",
          "station": "🚉",
          "statue_of_liberty": "🗽",
          "steam_locomotive": "🚂",
          "stew": "🍲",
          "stop_button": "⏹",
          "stop_sign": "🛑",
          "stopwatch": "⏱",
          "straight_ruler": "📏",
          "strawberry": "🍓",
          "stuck_out_tongue": "😛",
          "stuck_out_tongue_closed_eyes": "😝",
          "stuck_out_tongue_winking_eye": "😜",
          "studio_microphone": "🎙",
          "stuffed_flatbread": "🥙",
          "sun_behind_large_cloud": "🌥",
          "sun_behind_rain_cloud": "🌦",
          "sun_behind_small_cloud": "🌤",
          "sun_with_face": "🌞",
          "sunflower": "🌻",
          "sunglasses": "😎",
          "sunny": "☀️",
          "sunrise": "🌅",
          "sunrise_over_mountains": "🌄",
          "surfing_man": "🏄",
          "surfing_woman": "🏄&zwj;♀️",
          "sushi": "🍣",
          "suspension_railway": "🚟",
          "sweat": "😓",
          "sweat_drops": "💦",
          "sweat_smile": "😅",
          "sweet_potato": "🍠",
          "swimming_man": "🏊",
          "swimming_woman": "🏊&zwj;♀️",
          "symbols": "🔣",
          "synagogue": "🕍",
          "syringe": "💉",
          "taco": "🌮",
          "tada": "🎉",
          "tanabata_tree": "🎋",
          "taurus": "♉️",
          "taxi": "🚕",
          "tea": "🍵",
          "telephone_receiver": "📞",
          "telescope": "🔭",
          "tennis": "🎾",
          "tent": "⛺️",
          "thermometer": "🌡",
          "thinking": "🤔",
          "thought_balloon": "💭",
          "ticket": "🎫",
          "tickets": "🎟",
          "tiger": "🐯",
          "tiger2": "🐅",
          "timer_clock": "⏲",
          "tipping_hand_man": "💁&zwj;♂️",
          "tired_face": "😫",
          "tm": "™️",
          "toilet": "🚽",
          "tokyo_tower": "🗼",
          "tomato": "🍅",
          "tongue": "👅",
          "top": "🔝",
          "tophat": "🎩",
          "tornado": "🌪",
          "trackball": "🖲",
          "tractor": "🚜",
          "traffic_light": "🚥",
          "train": "🚋",
          "train2": "🚆",
          "tram": "🚊",
          "triangular_flag_on_post": "🚩",
          "triangular_ruler": "📐",
          "trident": "🔱",
          "triumph": "😤",
          "trolleybus": "🚎",
          "trophy": "🏆",
          "tropical_drink": "🍹",
          "tropical_fish": "🐠",
          "truck": "🚚",
          "trumpet": "🎺",
          "tulip": "🌷",
          "tumbler_glass": "🥃",
          "turkey": "🦃",
          "turtle": "🐢",
          "tv": "📺",
          "twisted_rightwards_arrows": "🔀",
          "two_hearts": "💕",
          "two_men_holding_hands": "👬",
          "two_women_holding_hands": "👭",
          "u5272": "🈹",
          "u5408": "🈴",
          "u55b6": "🈺",
          "u6307": "🈯️",
          "u6708": "🈷️",
          "u6709": "🈶",
          "u6e80": "🈵",
          "u7121": "🈚️",
          "u7533": "🈸",
          "u7981": "🈲",
          "u7a7a": "🈳",
          "umbrella": "☔️",
          "unamused": "😒",
          "underage": "🔞",
          "unicorn": "🦄",
          "unlock": "🔓",
          "up": "🆙",
          "upside_down_face": "🙃",
          "v": "✌️",
          "vertical_traffic_light": "🚦",
          "vhs": "📼",
          "vibration_mode": "📳",
          "video_camera": "📹",
          "video_game": "🎮",
          "violin": "🎻",
          "virgo": "♍️",
          "volcano": "🌋",
          "volleyball": "🏐",
          "vs": "🆚",
          "vulcan_salute": "🖖",
          "walking_man": "🚶",
          "walking_woman": "🚶&zwj;♀️",
          "waning_crescent_moon": "🌘",
          "waning_gibbous_moon": "🌖",
          "warning": "⚠️",
          "wastebasket": "🗑",
          "watch": "⌚️",
          "water_buffalo": "🐃",
          "watermelon": "🍉",
          "wave": "👋",
          "wavy_dash": "〰️",
          "waxing_crescent_moon": "🌒",
          "wc": "🚾",
          "weary": "😩",
          "wedding": "💒",
          "weight_lifting_man": "🏋️",
          "weight_lifting_woman": "🏋️&zwj;♀️",
          "whale": "🐳",
          "whale2": "🐋",
          "wheel_of_dharma": "☸️",
          "wheelchair": "♿️",
          "white_check_mark": "✅",
          "white_circle": "⚪️",
          "white_flag": "🏳️",
          "white_flower": "💮",
          "white_large_square": "⬜️",
          "white_medium_small_square": "◽️",
          "white_medium_square": "◻️",
          "white_small_square": "▫️",
          "white_square_button": "🔳",
          "wilted_flower": "🥀",
          "wind_chime": "🎐",
          "wind_face": "🌬",
          "wine_glass": "🍷",
          "wink": "😉",
          "wolf": "🐺",
          "woman": "👩",
          "woman_artist": "👩&zwj;🎨",
          "woman_astronaut": "👩&zwj;🚀",
          "woman_cartwheeling": "🤸&zwj;♀️",
          "woman_cook": "👩&zwj;🍳",
          "woman_facepalming": "🤦&zwj;♀️",
          "woman_factory_worker": "👩&zwj;🏭",
          "woman_farmer": "👩&zwj;🌾",
          "woman_firefighter": "👩&zwj;🚒",
          "woman_health_worker": "👩&zwj;⚕️",
          "woman_judge": "👩&zwj;⚖️",
          "woman_juggling": "🤹&zwj;♀️",
          "woman_mechanic": "👩&zwj;🔧",
          "woman_office_worker": "👩&zwj;💼",
          "woman_pilot": "👩&zwj;✈️",
          "woman_playing_handball": "🤾&zwj;♀️",
          "woman_playing_water_polo": "🤽&zwj;♀️",
          "woman_scientist": "👩&zwj;🔬",
          "woman_shrugging": "🤷&zwj;♀️",
          "woman_singer": "👩&zwj;🎤",
          "woman_student": "👩&zwj;🎓",
          "woman_teacher": "👩&zwj;🏫",
          "woman_technologist": "👩&zwj;💻",
          "woman_with_turban": "👳&zwj;♀️",
          "womans_clothes": "👚",
          "womans_hat": "👒",
          "women_wrestling": "🤼&zwj;♀️",
          "womens": "🚺",
          "world_map": "🗺",
          "worried": "😟",
          "wrench": "🔧",
          "writing_hand": "✍️",
          "x": "❌",
          "yellow_heart": "💛",
          "yen": "💴",
          "yin_yang": "☯️",
          "yum": "😋",
          "zap": "⚡️",
          "zipper_mouth_face": "🤐",
          "zzz": "💤",
          "octocat": "<img alt=\":octocat:\" height=\"20\" width=\"20\" align=\"absmiddle\" src=\"https://assets-cdn.github.com/images/icons/emoji/octocat.png\">",
          "showdown": "<span style=\"font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;\">S</span>"
        };
        showdown.Converter = function (converterOptions) {
          var options = {}, langExtensions = [], outputModifiers = [], listeners = {}, setConvFlavor = setFlavor, metadata = {
            parsed: {},
            raw: "",
            format: ""
          };
          _constructor();
          function _constructor() {
            converterOptions = converterOptions || ({});
            for (var gOpt in globalOptions) {
              if (globalOptions.hasOwnProperty(gOpt)) {
                options[gOpt] = globalOptions[gOpt];
              }
            }
            if (typeof converterOptions === "object") {
              for (var opt in converterOptions) {
                if (converterOptions.hasOwnProperty(opt)) {
                  options[opt] = converterOptions[opt];
                }
              }
            } else {
              throw Error("Converter expects the passed parameter to be an object, but " + typeof converterOptions + " was passed instead.");
            }
            if (options.extensions) {
              showdown.helper.forEach(options.extensions, _parseExtension);
            }
          }
          function _parseExtension(ext, name) {
            name = name || null;
            if (showdown.helper.isString(ext)) {
              ext = showdown.helper.stdExtName(ext);
              name = ext;
              if (showdown.extensions[ext]) {
                console.warn("DEPRECATION WARNING: " + ext + " is an old extension that uses a deprecated loading method." + "Please inform the developer that the extension should be updated!");
                legacyExtensionLoading(showdown.extensions[ext], ext);
                return;
              } else if (!showdown.helper.isUndefined(extensions[ext])) {
                ext = extensions[ext];
              } else {
                throw Error("Extension \"" + ext + "\" could not be loaded. It was either not found or is not a valid extension.");
              }
            }
            if (typeof ext === "function") {
              ext = ext();
            }
            if (!showdown.helper.isArray(ext)) {
              ext = [ext];
            }
            var validExt = validate(ext, name);
            if (!validExt.valid) {
              throw Error(validExt.error);
            }
            for (var i = 0; i < ext.length; ++i) {
              switch (ext[i].type) {
                case "lang":
                  langExtensions.push(ext[i]);
                  break;
                case "output":
                  outputModifiers.push(ext[i]);
                  break;
              }
              if (ext[i].hasOwnProperty("listeners")) {
                for (var ln in ext[i].listeners) {
                  if (ext[i].listeners.hasOwnProperty(ln)) {
                    listen(ln, ext[i].listeners[ln]);
                  }
                }
              }
            }
          }
          function legacyExtensionLoading(ext, name) {
            if (typeof ext === "function") {
              ext = ext(new showdown.Converter());
            }
            if (!showdown.helper.isArray(ext)) {
              ext = [ext];
            }
            var valid = validate(ext, name);
            if (!valid.valid) {
              throw Error(valid.error);
            }
            for (var i = 0; i < ext.length; ++i) {
              switch (ext[i].type) {
                case "lang":
                  langExtensions.push(ext[i]);
                  break;
                case "output":
                  outputModifiers.push(ext[i]);
                  break;
                default:
                  throw Error("Extension loader error: Type unrecognized!!!");
              }
            }
          }
          function listen(name, callback) {
            if (!showdown.helper.isString(name)) {
              throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof name + " given");
            }
            if (typeof callback !== "function") {
              throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof callback + " given");
            }
            if (!listeners.hasOwnProperty(name)) {
              listeners[name] = [];
            }
            listeners[name].push(callback);
          }
          function rTrimInputText(text) {
            var rsp = text.match(/^\s*/)[0].length, rgx = new RegExp("^\\s{0," + rsp + "}", "gm");
            return text.replace(rgx, "");
          }
          this._dispatch = function dispatch(evtName, text, options, globals) {
            if (listeners.hasOwnProperty(evtName)) {
              for (var ei = 0; ei < listeners[evtName].length; ++ei) {
                var nText = listeners[evtName][ei](evtName, text, this, options, globals);
                if (nText && typeof nText !== "undefined") {
                  text = nText;
                }
              }
            }
            return text;
          };
          this.listen = function (name, callback) {
            listen(name, callback);
            return this;
          };
          this.makeHtml = function (text) {
            if (!text) {
              return text;
            }
            var globals = {
              gHtmlBlocks: [],
              gHtmlMdBlocks: [],
              gHtmlSpans: [],
              gUrls: {},
              gTitles: {},
              gDimensions: {},
              gListLevel: 0,
              hashLinkCounts: {},
              langExtensions: langExtensions,
              outputModifiers: outputModifiers,
              converter: this,
              ghCodeBlocks: [],
              metadata: {
                parsed: {},
                raw: "",
                format: ""
              }
            };
            text = text.replace(/¨/g, "¨T");
            text = text.replace(/\$/g, "¨D");
            text = text.replace(/\r\n/g, "\n");
            text = text.replace(/\r/g, "\n");
            text = text.replace(/\u00A0/g, "&nbsp;");
            if (options.smartIndentationFix) {
              text = rTrimInputText(text);
            }
            text = "\n\n" + text + "\n\n";
            text = showdown.subParser("detab")(text, options, globals);
            text = text.replace(/^[ \t]+$/mg, "");
            showdown.helper.forEach(langExtensions, function (ext) {
              text = showdown.subParser("runExtension")(ext, text, options, globals);
            });
            text = showdown.subParser("metadata")(text, options, globals);
            text = showdown.subParser("hashPreCodeTags")(text, options, globals);
            text = showdown.subParser("githubCodeBlocks")(text, options, globals);
            text = showdown.subParser("hashHTMLBlocks")(text, options, globals);
            text = showdown.subParser("hashCodeTags")(text, options, globals);
            text = showdown.subParser("stripLinkDefinitions")(text, options, globals);
            text = showdown.subParser("blockGamut")(text, options, globals);
            text = showdown.subParser("unhashHTMLSpans")(text, options, globals);
            text = showdown.subParser("unescapeSpecialChars")(text, options, globals);
            text = text.replace(/¨D/g, "$$");
            text = text.replace(/¨T/g, "¨");
            text = showdown.subParser("completeHTMLDocument")(text, options, globals);
            showdown.helper.forEach(outputModifiers, function (ext) {
              text = showdown.subParser("runExtension")(ext, text, options, globals);
            });
            metadata = globals.metadata;
            return text;
          };
          this.makeMarkdown = this.makeMd = function (src, HTMLParser) {
            src = src.replace(/\r\n/g, "\n");
            src = src.replace(/\r/g, "\n");
            src = src.replace(/>[ \t]+</, ">¨NBSP;<");
            if (!HTMLParser) {
              if (window && window.document) {
                HTMLParser = window.document;
              } else {
                throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
              }
            }
            var doc = HTMLParser.createElement("div");
            doc.innerHTML = src;
            var globals = {
              preList: substitutePreCodeTags(doc)
            };
            clean(doc);
            var nodes = doc.childNodes, mdDoc = "";
            for (var i = 0; i < nodes.length; i++) {
              mdDoc += showdown.subParser("makeMarkdown.node")(nodes[i], globals);
            }
            function clean(node) {
              for (var n = 0; n < node.childNodes.length; ++n) {
                var child = node.childNodes[n];
                if (child.nodeType === 3) {
                  if (!(/\S/).test(child.nodeValue) && !(/^[ ]+$/).test(child.nodeValue)) {
                    node.removeChild(child);
                    --n;
                  } else {
                    child.nodeValue = child.nodeValue.split("\n").join(" ");
                    child.nodeValue = child.nodeValue.replace(/(\s)+/g, "$1");
                  }
                } else if (child.nodeType === 1) {
                  clean(child);
                }
              }
            }
            function substitutePreCodeTags(doc) {
              var pres = doc.querySelectorAll("pre"), presPH = [];
              for (var i = 0; i < pres.length; ++i) {
                if (pres[i].childElementCount === 1 && pres[i].firstChild.tagName.toLowerCase() === "code") {
                  var content = pres[i].firstChild.innerHTML.trim(), language = pres[i].firstChild.getAttribute("data-language") || "";
                  if (language === "") {
                    var classes = pres[i].firstChild.className.split(" ");
                    for (var c = 0; c < classes.length; ++c) {
                      var matches = classes[c].match(/^language-(.+)$/);
                      if (matches !== null) {
                        language = matches[1];
                        break;
                      }
                    }
                  }
                  content = showdown.helper.unescapeHTMLEntities(content);
                  presPH.push(content);
                  pres[i].outerHTML = "<precode language=\"" + language + "\" precodenum=\"" + i.toString() + "\"></precode>";
                } else {
                  presPH.push(pres[i].innerHTML);
                  pres[i].innerHTML = "";
                  pres[i].setAttribute("prenum", i.toString());
                }
              }
              return presPH;
            }
            return mdDoc;
          };
          this.setOption = function (key, value) {
            options[key] = value;
          };
          this.getOption = function (key) {
            return options[key];
          };
          this.getOptions = function () {
            return options;
          };
          this.addExtension = function (extension, name) {
            name = name || null;
            _parseExtension(extension, name);
          };
          this.useExtension = function (extensionName) {
            _parseExtension(extensionName);
          };
          this.setFlavor = function (name) {
            if (!flavor.hasOwnProperty(name)) {
              throw Error(name + " flavor was not found");
            }
            var preset = flavor[name];
            setConvFlavor = name;
            for (var option in preset) {
              if (preset.hasOwnProperty(option)) {
                options[option] = preset[option];
              }
            }
          };
          this.getFlavor = function () {
            return setConvFlavor;
          };
          this.removeExtension = function (extension) {
            if (!showdown.helper.isArray(extension)) {
              extension = [extension];
            }
            for (var a = 0; a < extension.length; ++a) {
              var ext = extension[a];
              for (var i = 0; i < langExtensions.length; ++i) {
                if (langExtensions[i] === ext) {
                  langExtensions.splice(i, 1);
                }
              }
              for (var ii = 0; ii < outputModifiers.length; ++ii) {
                if (outputModifiers[ii] === ext) {
                  outputModifiers.splice(ii, 1);
                }
              }
            }
          };
          this.getAllExtensions = function () {
            return {
              language: langExtensions,
              output: outputModifiers
            };
          };
          this.getMetadata = function (raw) {
            if (raw) {
              return metadata.raw;
            } else {
              return metadata.parsed;
            }
          };
          this.getMetadataFormat = function () {
            return metadata.format;
          };
          this._setMetadataPair = function (key, value) {
            metadata.parsed[key] = value;
          };
          this._setMetadataFormat = function (format) {
            metadata.format = format;
          };
          this._setMetadataRaw = function (raw) {
            metadata.raw = raw;
          };
        };
        showdown.subParser("anchors", function (text, options, globals) {
          text = globals.converter._dispatch("anchors.before", text, options, globals);
          var writeAnchorTag = function (wholeMatch, linkText, linkId, url, m5, m6, title) {
            if (showdown.helper.isUndefined(title)) {
              title = "";
            }
            linkId = linkId.toLowerCase();
            if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
              url = "";
            } else if (!url) {
              if (!linkId) {
                linkId = linkText.toLowerCase().replace(/ ?\n/g, " ");
              }
              url = "#" + linkId;
              if (!showdown.helper.isUndefined(globals.gUrls[linkId])) {
                url = globals.gUrls[linkId];
                if (!showdown.helper.isUndefined(globals.gTitles[linkId])) {
                  title = globals.gTitles[linkId];
                }
              } else {
                return wholeMatch;
              }
            }
            url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
            var result = "<a href=\"" + url + "\"";
            if (title !== "" && title !== null) {
              title = title.replace(/"/g, "&quot;");
              title = title.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
              result += " title=\"" + title + "\"";
            }
            if (options.openLinksInNewWindow && !(/^#/).test(url)) {
              result += " rel=\"noopener noreferrer\" target=\"¨E95Eblank\"";
            }
            result += ">" + linkText + "</a>";
            return result;
          };
          text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, writeAnchorTag);
          text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, writeAnchorTag);
          text = text.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, writeAnchorTag);
          text = text.replace(/\[([^\[\]]+)]()()()()()/g, writeAnchorTag);
          if (options.ghMentions) {
            text = text.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function (wm, st, escape, mentions, username) {
              if (escape === "\\") {
                return st + mentions;
              }
              if (!showdown.helper.isString(options.ghMentionsLink)) {
                throw new Error("ghMentionsLink option must be a string");
              }
              var lnk = options.ghMentionsLink.replace(/\{u}/g, username), target = "";
              if (options.openLinksInNewWindow) {
                target = " rel=\"noopener noreferrer\" target=\"¨E95Eblank\"";
              }
              return st + "<a href=\"" + lnk + "\"" + target + ">" + mentions + "</a>";
            });
          }
          text = globals.converter._dispatch("anchors.after", text, options, globals);
          return text;
        });
        var simpleURLRegex = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, simpleURLRegex2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, delimUrlRegex = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, simpleMailRegex = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi, delimMailRegex = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, replaceLink = function (options) {
          return function (wm, leadingMagicChars, link, m2, m3, trailingPunctuation, trailingMagicChars) {
            link = link.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
            var lnkTxt = link, append = "", target = "", lmc = leadingMagicChars || "", tmc = trailingMagicChars || "";
            if ((/^www\./i).test(link)) {
              link = link.replace(/^www\./i, "http://www.");
            }
            if (options.excludeTrailingPunctuationFromURLs && trailingPunctuation) {
              append = trailingPunctuation;
            }
            if (options.openLinksInNewWindow) {
              target = " rel=\"noopener noreferrer\" target=\"¨E95Eblank\"";
            }
            return lmc + "<a href=\"" + link + "\"" + target + ">" + lnkTxt + "</a>" + append + tmc;
          };
        }, replaceMail = function (options, globals) {
          return function (wholeMatch, b, mail) {
            var href = "mailto:";
            b = b || "";
            mail = showdown.subParser("unescapeSpecialChars")(mail, options, globals);
            if (options.encodeEmails) {
              href = showdown.helper.encodeEmailAddress(href + mail);
              mail = showdown.helper.encodeEmailAddress(mail);
            } else {
              href = href + mail;
            }
            return b + "<a href=\"" + href + "\">" + mail + "</a>";
          };
        };
        showdown.subParser("autoLinks", function (text, options, globals) {
          text = globals.converter._dispatch("autoLinks.before", text, options, globals);
          text = text.replace(delimUrlRegex, replaceLink(options));
          text = text.replace(delimMailRegex, replaceMail(options, globals));
          text = globals.converter._dispatch("autoLinks.after", text, options, globals);
          return text;
        });
        showdown.subParser("simplifiedAutoLinks", function (text, options, globals) {
          if (!options.simplifiedAutoLink) {
            return text;
          }
          text = globals.converter._dispatch("simplifiedAutoLinks.before", text, options, globals);
          if (options.excludeTrailingPunctuationFromURLs) {
            text = text.replace(simpleURLRegex2, replaceLink(options));
          } else {
            text = text.replace(simpleURLRegex, replaceLink(options));
          }
          text = text.replace(simpleMailRegex, replaceMail(options, globals));
          text = globals.converter._dispatch("simplifiedAutoLinks.after", text, options, globals);
          return text;
        });
        showdown.subParser("blockGamut", function (text, options, globals) {
          text = globals.converter._dispatch("blockGamut.before", text, options, globals);
          text = showdown.subParser("blockQuotes")(text, options, globals);
          text = showdown.subParser("headers")(text, options, globals);
          text = showdown.subParser("horizontalRule")(text, options, globals);
          text = showdown.subParser("lists")(text, options, globals);
          text = showdown.subParser("codeBlocks")(text, options, globals);
          text = showdown.subParser("tables")(text, options, globals);
          text = showdown.subParser("hashHTMLBlocks")(text, options, globals);
          text = showdown.subParser("paragraphs")(text, options, globals);
          text = globals.converter._dispatch("blockGamut.after", text, options, globals);
          return text;
        });
        showdown.subParser("blockQuotes", function (text, options, globals) {
          text = globals.converter._dispatch("blockQuotes.before", text, options, globals);
          text = text + "\n\n";
          var rgx = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
          if (options.splitAdjacentBlockquotes) {
            rgx = /^ {0,3}>[\s\S]*?(?:\n\n)/gm;
          }
          text = text.replace(rgx, function (bq) {
            bq = bq.replace(/^[ \t]*>[ \t]?/gm, "");
            bq = bq.replace(/¨0/g, "");
            bq = bq.replace(/^[ \t]+$/gm, "");
            bq = showdown.subParser("githubCodeBlocks")(bq, options, globals);
            bq = showdown.subParser("blockGamut")(bq, options, globals);
            bq = bq.replace(/(^|\n)/g, "$1  ");
            bq = bq.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function (wholeMatch, m1) {
              var pre = m1;
              pre = pre.replace(/^  /mg, "¨0");
              pre = pre.replace(/¨0/g, "");
              return pre;
            });
            return showdown.subParser("hashBlock")("<blockquote>\n" + bq + "\n</blockquote>", options, globals);
          });
          text = globals.converter._dispatch("blockQuotes.after", text, options, globals);
          return text;
        });
        showdown.subParser("codeBlocks", function (text, options, globals) {
          text = globals.converter._dispatch("codeBlocks.before", text, options, globals);
          text += "¨0";
          var pattern = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
          text = text.replace(pattern, function (wholeMatch, m1, m2) {
            var codeblock = m1, nextChar = m2, end = "\n";
            codeblock = showdown.subParser("outdent")(codeblock, options, globals);
            codeblock = showdown.subParser("encodeCode")(codeblock, options, globals);
            codeblock = showdown.subParser("detab")(codeblock, options, globals);
            codeblock = codeblock.replace(/^\n+/g, "");
            codeblock = codeblock.replace(/\n+$/g, "");
            if (options.omitExtraWLInCodeBlocks) {
              end = "";
            }
            codeblock = "<pre><code>" + codeblock + end + "</code></pre>";
            return showdown.subParser("hashBlock")(codeblock, options, globals) + nextChar;
          });
          text = text.replace(/¨0/, "");
          text = globals.converter._dispatch("codeBlocks.after", text, options, globals);
          return text;
        });
        showdown.subParser("codeSpans", function (text, options, globals) {
          text = globals.converter._dispatch("codeSpans.before", text, options, globals);
          if (typeof text === "undefined") {
            text = "";
          }
          text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function (wholeMatch, m1, m2, m3) {
            var c = m3;
            c = c.replace(/^([ \t]*)/g, "");
            c = c.replace(/[ \t]*$/g, "");
            c = showdown.subParser("encodeCode")(c, options, globals);
            c = m1 + "<code>" + c + "</code>";
            c = showdown.subParser("hashHTMLSpans")(c, options, globals);
            return c;
          });
          text = globals.converter._dispatch("codeSpans.after", text, options, globals);
          return text;
        });
        showdown.subParser("completeHTMLDocument", function (text, options, globals) {
          if (!options.completeHTMLDocument) {
            return text;
          }
          text = globals.converter._dispatch("completeHTMLDocument.before", text, options, globals);
          var doctype = "html", doctypeParsed = "<!DOCTYPE HTML>\n", title = "", charset = "<meta charset=\"utf-8\">\n", lang = "", metadata = "";
          if (typeof globals.metadata.parsed.doctype !== "undefined") {
            doctypeParsed = "<!DOCTYPE " + globals.metadata.parsed.doctype + ">\n";
            doctype = globals.metadata.parsed.doctype.toString().toLowerCase();
            if (doctype === "html" || doctype === "html5") {
              charset = "<meta charset=\"utf-8\">";
            }
          }
          for (var meta in globals.metadata.parsed) {
            if (globals.metadata.parsed.hasOwnProperty(meta)) {
              switch (meta.toLowerCase()) {
                case "doctype":
                  break;
                case "title":
                  title = "<title>" + globals.metadata.parsed.title + "</title>\n";
                  break;
                case "charset":
                  if (doctype === "html" || doctype === "html5") {
                    charset = "<meta charset=\"" + globals.metadata.parsed.charset + "\">\n";
                  } else {
                    charset = "<meta name=\"charset\" content=\"" + globals.metadata.parsed.charset + "\">\n";
                  }
                  break;
                case "language":
                case "lang":
                  lang = " lang=\"" + globals.metadata.parsed[meta] + "\"";
                  metadata += "<meta name=\"" + meta + "\" content=\"" + globals.metadata.parsed[meta] + "\">\n";
                  break;
                default:
                  metadata += "<meta name=\"" + meta + "\" content=\"" + globals.metadata.parsed[meta] + "\">\n";
              }
            }
          }
          text = doctypeParsed + "<html" + lang + ">\n<head>\n" + title + charset + metadata + "</head>\n<body>\n" + text.trim() + "\n</body>\n</html>";
          text = globals.converter._dispatch("completeHTMLDocument.after", text, options, globals);
          return text;
        });
        showdown.subParser("detab", function (text, options, globals) {
          text = globals.converter._dispatch("detab.before", text, options, globals);
          text = text.replace(/\t(?=\t)/g, "    ");
          text = text.replace(/\t/g, "¨A¨B");
          text = text.replace(/¨B(.+?)¨A/g, function (wholeMatch, m1) {
            var leadingText = m1, numSpaces = 4 - leadingText.length % 4;
            for (var i = 0; i < numSpaces; i++) {
              leadingText += " ";
            }
            return leadingText;
          });
          text = text.replace(/¨A/g, "    ");
          text = text.replace(/¨B/g, "");
          text = globals.converter._dispatch("detab.after", text, options, globals);
          return text;
        });
        showdown.subParser("ellipsis", function (text, options, globals) {
          if (!options.ellipsis) {
            return text;
          }
          text = globals.converter._dispatch("ellipsis.before", text, options, globals);
          text = text.replace(/\.\.\./g, "…");
          text = globals.converter._dispatch("ellipsis.after", text, options, globals);
          return text;
        });
        showdown.subParser("emoji", function (text, options, globals) {
          if (!options.emoji) {
            return text;
          }
          text = globals.converter._dispatch("emoji.before", text, options, globals);
          var emojiRgx = /:([\S]+?):/g;
          text = text.replace(emojiRgx, function (wm, emojiCode) {
            if (showdown.helper.emojis.hasOwnProperty(emojiCode)) {
              return showdown.helper.emojis[emojiCode];
            }
            return wm;
          });
          text = globals.converter._dispatch("emoji.after", text, options, globals);
          return text;
        });
        showdown.subParser("encodeAmpsAndAngles", function (text, options, globals) {
          text = globals.converter._dispatch("encodeAmpsAndAngles.before", text, options, globals);
          text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;");
          text = text.replace(/<(?![a-z\/?$!])/gi, "&lt;");
          text = text.replace(/</g, "&lt;");
          text = text.replace(/>/g, "&gt;");
          text = globals.converter._dispatch("encodeAmpsAndAngles.after", text, options, globals);
          return text;
        });
        showdown.subParser("encodeBackslashEscapes", function (text, options, globals) {
          text = globals.converter._dispatch("encodeBackslashEscapes.before", text, options, globals);
          text = text.replace(/\\(\\)/g, showdown.helper.escapeCharactersCallback);
          text = text.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, showdown.helper.escapeCharactersCallback);
          text = globals.converter._dispatch("encodeBackslashEscapes.after", text, options, globals);
          return text;
        });
        showdown.subParser("encodeCode", function (text, options, globals) {
          text = globals.converter._dispatch("encodeCode.before", text, options, globals);
          text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, showdown.helper.escapeCharactersCallback);
          text = globals.converter._dispatch("encodeCode.after", text, options, globals);
          return text;
        });
        showdown.subParser("escapeSpecialCharsWithinTagAttributes", function (text, options, globals) {
          text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", text, options, globals);
          var tags = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, comments = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
          text = text.replace(tags, function (wholeMatch) {
            return wholeMatch.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
          });
          text = text.replace(comments, function (wholeMatch) {
            return wholeMatch.replace(/([\\`*_~=|])/g, showdown.helper.escapeCharactersCallback);
          });
          text = globals.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", text, options, globals);
          return text;
        });
        showdown.subParser("githubCodeBlocks", function (text, options, globals) {
          if (!options.ghCodeBlocks) {
            return text;
          }
          text = globals.converter._dispatch("githubCodeBlocks.before", text, options, globals);
          text += "¨0";
          text = text.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function (wholeMatch, delim, language, codeblock) {
            var end = options.omitExtraWLInCodeBlocks ? "" : "\n";
            codeblock = showdown.subParser("encodeCode")(codeblock, options, globals);
            codeblock = showdown.subParser("detab")(codeblock, options, globals);
            codeblock = codeblock.replace(/^\n+/g, "");
            codeblock = codeblock.replace(/\n+$/g, "");
            codeblock = "<pre><code" + (language ? " class=\"" + language + " language-" + language + "\"" : "") + ">" + codeblock + end + "</code></pre>";
            codeblock = showdown.subParser("hashBlock")(codeblock, options, globals);
            return "\n\n¨G" + (globals.ghCodeBlocks.push({
              text: wholeMatch,
              codeblock: codeblock
            }) - 1) + "G\n\n";
          });
          text = text.replace(/¨0/, "");
          return globals.converter._dispatch("githubCodeBlocks.after", text, options, globals);
        });
        showdown.subParser("hashBlock", function (text, options, globals) {
          text = globals.converter._dispatch("hashBlock.before", text, options, globals);
          text = text.replace(/(^\n+|\n+$)/g, "");
          text = "\n\n¨K" + (globals.gHtmlBlocks.push(text) - 1) + "K\n\n";
          text = globals.converter._dispatch("hashBlock.after", text, options, globals);
          return text;
        });
        showdown.subParser("hashCodeTags", function (text, options, globals) {
          text = globals.converter._dispatch("hashCodeTags.before", text, options, globals);
          var repFunc = function (wholeMatch, match, left, right) {
            var codeblock = left + showdown.subParser("encodeCode")(match, options, globals) + right;
            return "¨C" + (globals.gHtmlSpans.push(codeblock) - 1) + "C";
          };
          text = showdown.helper.replaceRecursiveRegExp(text, repFunc, "<code\\b[^>]*>", "</code>", "gim");
          text = globals.converter._dispatch("hashCodeTags.after", text, options, globals);
          return text;
        });
        showdown.subParser("hashElement", function (text, options, globals) {
          return function (wholeMatch, m1) {
            var blockText = m1;
            blockText = blockText.replace(/\n\n/g, "\n");
            blockText = blockText.replace(/^\n/, "");
            blockText = blockText.replace(/\n+$/g, "");
            blockText = "\n\n¨K" + (globals.gHtmlBlocks.push(blockText) - 1) + "K\n\n";
            return blockText;
          };
        });
        showdown.subParser("hashHTMLBlocks", function (text, options, globals) {
          text = globals.converter._dispatch("hashHTMLBlocks.before", text, options, globals);
          var blockTags = ["pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p"], repFunc = function (wholeMatch, match, left, right) {
            var txt = wholeMatch;
            if (left.search(/\bmarkdown\b/) !== -1) {
              txt = left + globals.converter.makeHtml(match) + right;
            }
            return "\n\n¨K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
          };
          if (options.backslashEscapesHTMLTags) {
            text = text.replace(/\\<(\/?[^>]+?)>/g, function (wm, inside) {
              return "&lt;" + inside + "&gt;";
            });
          }
          for (var i = 0; i < blockTags.length; ++i) {
            var opTagPos, rgx1 = new RegExp("^ {0,3}(<" + blockTags[i] + "\\b[^>]*>)", "im"), patLeft = "<" + blockTags[i] + "\\b[^>]*>", patRight = "</" + blockTags[i] + ">";
            while ((opTagPos = showdown.helper.regexIndexOf(text, rgx1)) !== -1) {
              var subTexts = showdown.helper.splitAtIndex(text, opTagPos), newSubText1 = showdown.helper.replaceRecursiveRegExp(subTexts[1], repFunc, patLeft, patRight, "im");
              if (newSubText1 === subTexts[1]) {
                break;
              }
              text = subTexts[0].concat(newSubText1);
            }
          }
          text = text.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, showdown.subParser("hashElement")(text, options, globals));
          text = showdown.helper.replaceRecursiveRegExp(text, function (txt) {
            return "\n\n¨K" + (globals.gHtmlBlocks.push(txt) - 1) + "K\n\n";
          }, "^ {0,3}<!--", "-->", "gm");
          text = text.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, showdown.subParser("hashElement")(text, options, globals));
          text = globals.converter._dispatch("hashHTMLBlocks.after", text, options, globals);
          return text;
        });
        showdown.subParser("hashHTMLSpans", function (text, options, globals) {
          text = globals.converter._dispatch("hashHTMLSpans.before", text, options, globals);
          function hashHTMLSpan(html) {
            return "¨C" + (globals.gHtmlSpans.push(html) - 1) + "C";
          }
          text = text.replace(/<[^>]+?\/>/gi, function (wm) {
            return hashHTMLSpan(wm);
          });
          text = text.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function (wm) {
            return hashHTMLSpan(wm);
          });
          text = text.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function (wm) {
            return hashHTMLSpan(wm);
          });
          text = text.replace(/<[^>]+?>/gi, function (wm) {
            return hashHTMLSpan(wm);
          });
          text = globals.converter._dispatch("hashHTMLSpans.after", text, options, globals);
          return text;
        });
        showdown.subParser("unhashHTMLSpans", function (text, options, globals) {
          text = globals.converter._dispatch("unhashHTMLSpans.before", text, options, globals);
          for (var i = 0; i < globals.gHtmlSpans.length; ++i) {
            var repText = globals.gHtmlSpans[i], limit = 0;
            while ((/¨C(\d+)C/).test(repText)) {
              var num = RegExp.$1;
              repText = repText.replace("¨C" + num + "C", globals.gHtmlSpans[num]);
              if (limit === 10) {
                console.error("maximum nesting of 10 spans reached!!!");
                break;
              }
              ++limit;
            }
            text = text.replace("¨C" + i + "C", repText);
          }
          text = globals.converter._dispatch("unhashHTMLSpans.after", text, options, globals);
          return text;
        });
        showdown.subParser("hashPreCodeTags", function (text, options, globals) {
          text = globals.converter._dispatch("hashPreCodeTags.before", text, options, globals);
          var repFunc = function (wholeMatch, match, left, right) {
            var codeblock = left + showdown.subParser("encodeCode")(match, options, globals) + right;
            return "\n\n¨G" + (globals.ghCodeBlocks.push({
              text: wholeMatch,
              codeblock: codeblock
            }) - 1) + "G\n\n";
          };
          text = showdown.helper.replaceRecursiveRegExp(text, repFunc, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim");
          text = globals.converter._dispatch("hashPreCodeTags.after", text, options, globals);
          return text;
        });
        showdown.subParser("headers", function (text, options, globals) {
          text = globals.converter._dispatch("headers.before", text, options, globals);
          var headerLevelStart = isNaN(parseInt(options.headerLevelStart)) ? 1 : parseInt(options.headerLevelStart), setextRegexH1 = options.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, setextRegexH2 = options.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
          text = text.replace(setextRegexH1, function (wholeMatch, m1) {
            var spanGamut = showdown.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : " id=\"" + headerId(m1) + "\"", hLevel = headerLevelStart, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
            return showdown.subParser("hashBlock")(hashBlock, options, globals);
          });
          text = text.replace(setextRegexH2, function (matchFound, m1) {
            var spanGamut = showdown.subParser("spanGamut")(m1, options, globals), hID = options.noHeaderId ? "" : " id=\"" + headerId(m1) + "\"", hLevel = headerLevelStart + 1, hashBlock = "<h" + hLevel + hID + ">" + spanGamut + "</h" + hLevel + ">";
            return showdown.subParser("hashBlock")(hashBlock, options, globals);
          });
          var atxStyle = options.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
          text = text.replace(atxStyle, function (wholeMatch, m1, m2) {
            var hText = m2;
            if (options.customizedHeaderId) {
              hText = m2.replace(/\s?\{([^{]+?)}\s*$/, "");
            }
            var span = showdown.subParser("spanGamut")(hText, options, globals), hID = options.noHeaderId ? "" : " id=\"" + headerId(m2) + "\"", hLevel = headerLevelStart - 1 + m1.length, header = "<h" + hLevel + hID + ">" + span + "</h" + hLevel + ">";
            return showdown.subParser("hashBlock")(header, options, globals);
          });
          function headerId(m) {
            var title, prefix;
            if (options.customizedHeaderId) {
              var match = m.match(/\{([^{]+?)}\s*$/);
              if (match && match[1]) {
                m = match[1];
              }
            }
            title = m;
            if (showdown.helper.isString(options.prefixHeaderId)) {
              prefix = options.prefixHeaderId;
            } else if (options.prefixHeaderId === true) {
              prefix = "section-";
            } else {
              prefix = "";
            }
            if (!options.rawPrefixHeaderId) {
              title = prefix + title;
            }
            if (options.ghCompatibleHeaderId) {
              title = title.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase();
            } else if (options.rawHeaderId) {
              title = title.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "¨").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase();
            } else {
              title = title.replace(/[^\w]/g, "").toLowerCase();
            }
            if (options.rawPrefixHeaderId) {
              title = prefix + title;
            }
            if (globals.hashLinkCounts[title]) {
              title = title + "-" + globals.hashLinkCounts[title]++;
            } else {
              globals.hashLinkCounts[title] = 1;
            }
            return title;
          }
          text = globals.converter._dispatch("headers.after", text, options, globals);
          return text;
        });
        showdown.subParser("horizontalRule", function (text, options, globals) {
          text = globals.converter._dispatch("horizontalRule.before", text, options, globals);
          var key = showdown.subParser("hashBlock")("<hr />", options, globals);
          text = text.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, key);
          text = text.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, key);
          text = text.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, key);
          text = globals.converter._dispatch("horizontalRule.after", text, options, globals);
          return text;
        });
        showdown.subParser("images", function (text, options, globals) {
          text = globals.converter._dispatch("images.before", text, options, globals);
          var inlineRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, crazyRegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, base64RegExp = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, referenceRegExp = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, refShortcutRegExp = /!\[([^\[\]]+)]()()()()()/g;
          function writeImageTagBase64(wholeMatch, altText, linkId, url, width, height, m5, title) {
            url = url.replace(/\s/g, "");
            return writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title);
          }
          function writeImageTag(wholeMatch, altText, linkId, url, width, height, m5, title) {
            var gUrls = globals.gUrls, gTitles = globals.gTitles, gDims = globals.gDimensions;
            linkId = linkId.toLowerCase();
            if (!title) {
              title = "";
            }
            if (wholeMatch.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1) {
              url = "";
            } else if (url === "" || url === null) {
              if (linkId === "" || linkId === null) {
                linkId = altText.toLowerCase().replace(/ ?\n/g, " ");
              }
              url = "#" + linkId;
              if (!showdown.helper.isUndefined(gUrls[linkId])) {
                url = gUrls[linkId];
                if (!showdown.helper.isUndefined(gTitles[linkId])) {
                  title = gTitles[linkId];
                }
                if (!showdown.helper.isUndefined(gDims[linkId])) {
                  width = gDims[linkId].width;
                  height = gDims[linkId].height;
                }
              } else {
                return wholeMatch;
              }
            }
            altText = altText.replace(/"/g, "&quot;").replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
            url = url.replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
            var result = "<img src=\"" + url + "\" alt=\"" + altText + "\"";
            if (title && showdown.helper.isString(title)) {
              title = title.replace(/"/g, "&quot;").replace(showdown.helper.regexes.asteriskDashAndColon, showdown.helper.escapeCharactersCallback);
              result += " title=\"" + title + "\"";
            }
            if (width && height) {
              width = width === "*" ? "auto" : width;
              height = height === "*" ? "auto" : height;
              result += " width=\"" + width + "\"";
              result += " height=\"" + height + "\"";
            }
            result += " />";
            return result;
          }
          text = text.replace(referenceRegExp, writeImageTag);
          text = text.replace(base64RegExp, writeImageTagBase64);
          text = text.replace(crazyRegExp, writeImageTag);
          text = text.replace(inlineRegExp, writeImageTag);
          text = text.replace(refShortcutRegExp, writeImageTag);
          text = globals.converter._dispatch("images.after", text, options, globals);
          return text;
        });
        showdown.subParser("italicsAndBold", function (text, options, globals) {
          text = globals.converter._dispatch("italicsAndBold.before", text, options, globals);
          function parseInside(txt, left, right) {
            return left + txt + right;
          }
          if (options.literalMidWordUnderscores) {
            text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function (wm, txt) {
              return parseInside(txt, "<strong><em>", "</em></strong>");
            });
            text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function (wm, txt) {
              return parseInside(txt, "<strong>", "</strong>");
            });
            text = text.replace(/\b_(\S[\s\S]*?)_\b/g, function (wm, txt) {
              return parseInside(txt, "<em>", "</em>");
            });
          } else {
            text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
              return (/\S$/).test(m) ? parseInside(m, "<strong><em>", "</em></strong>") : wm;
            });
            text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
              return (/\S$/).test(m) ? parseInside(m, "<strong>", "</strong>") : wm;
            });
            text = text.replace(/_([^\s_][\s\S]*?)_/g, function (wm, m) {
              return (/\S$/).test(m) ? parseInside(m, "<em>", "</em>") : wm;
            });
          }
          if (options.literalMidWordAsterisks) {
            text = text.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function (wm, lead, txt) {
              return parseInside(txt, lead + "<strong><em>", "</em></strong>");
            });
            text = text.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function (wm, lead, txt) {
              return parseInside(txt, lead + "<strong>", "</strong>");
            });
            text = text.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function (wm, lead, txt) {
              return parseInside(txt, lead + "<em>", "</em>");
            });
          } else {
            text = text.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function (wm, m) {
              return (/\S$/).test(m) ? parseInside(m, "<strong><em>", "</em></strong>") : wm;
            });
            text = text.replace(/\*\*(\S[\s\S]*?)\*\*/g, function (wm, m) {
              return (/\S$/).test(m) ? parseInside(m, "<strong>", "</strong>") : wm;
            });
            text = text.replace(/\*([^\s*][\s\S]*?)\*/g, function (wm, m) {
              return (/\S$/).test(m) ? parseInside(m, "<em>", "</em>") : wm;
            });
          }
          text = globals.converter._dispatch("italicsAndBold.after", text, options, globals);
          return text;
        });
        showdown.subParser("lists", function (text, options, globals) {
          function processListItems(listStr, trimTrailing) {
            globals.gListLevel++;
            listStr = listStr.replace(/\n{2,}$/, "\n");
            listStr += "¨0";
            var rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, isParagraphed = (/\n[ \t]*\n(?!¨0)/).test(listStr);
            if (options.disableForced4SpacesIndentedSublists) {
              rgx = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm;
            }
            listStr = listStr.replace(rgx, function (wholeMatch, m1, m2, m3, m4, taskbtn, checked) {
              checked = checked && checked.trim() !== "";
              var item = showdown.subParser("outdent")(m4, options, globals), bulletStyle = "";
              if (taskbtn && options.tasklists) {
                bulletStyle = " class=\"task-list-item\" style=\"list-style-type: none;\"";
                item = item.replace(/^[ \t]*\[(x|X| )?]/m, function () {
                  var otp = "<input type=\"checkbox\" disabled style=\"margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;\"";
                  if (checked) {
                    otp += " checked";
                  }
                  otp += ">";
                  return otp;
                });
              }
              item = item.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function (wm2) {
                return "¨A" + wm2;
              });
              if (m1 || item.search(/\n{2,}/) > -1) {
                item = showdown.subParser("githubCodeBlocks")(item, options, globals);
                item = showdown.subParser("blockGamut")(item, options, globals);
              } else {
                item = showdown.subParser("lists")(item, options, globals);
                item = item.replace(/\n$/, "");
                item = showdown.subParser("hashHTMLBlocks")(item, options, globals);
                item = item.replace(/\n\n+/g, "\n\n");
                if (isParagraphed) {
                  item = showdown.subParser("paragraphs")(item, options, globals);
                } else {
                  item = showdown.subParser("spanGamut")(item, options, globals);
                }
              }
              item = item.replace("¨A", "");
              item = "<li" + bulletStyle + ">" + item + "</li>\n";
              return item;
            });
            listStr = listStr.replace(/¨0/g, "");
            globals.gListLevel--;
            if (trimTrailing) {
              listStr = listStr.replace(/\s+$/, "");
            }
            return listStr;
          }
          function styleStartNumber(list, listType) {
            if (listType === "ol") {
              var res = list.match(/^ *(\d+)\./);
              if (res && res[1] !== "1") {
                return " start=\"" + res[1] + "\"";
              }
            }
            return "";
          }
          function parseConsecutiveLists(list, listType, trimTrailing) {
            var olRgx = options.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, ulRgx = options.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, counterRxg = listType === "ul" ? olRgx : ulRgx, result = "";
            if (list.search(counterRxg) !== -1) {
              (function parseCL(txt) {
                var pos = txt.search(counterRxg), style = styleStartNumber(list, listType);
                if (pos !== -1) {
                  result += "\n\n<" + listType + style + ">\n" + processListItems(txt.slice(0, pos), !!trimTrailing) + "</" + listType + ">\n";
                  listType = listType === "ul" ? "ol" : "ul";
                  counterRxg = listType === "ul" ? olRgx : ulRgx;
                  parseCL(txt.slice(pos));
                } else {
                  result += "\n\n<" + listType + style + ">\n" + processListItems(txt, !!trimTrailing) + "</" + listType + ">\n";
                }
              })(list);
            } else {
              var style = styleStartNumber(list, listType);
              result = "\n\n<" + listType + style + ">\n" + processListItems(list, !!trimTrailing) + "</" + listType + ">\n";
            }
            return result;
          }
          text = globals.converter._dispatch("lists.before", text, options, globals);
          text += "¨0";
          if (globals.gListLevel) {
            text = text.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function (wholeMatch, list, m2) {
              var listType = m2.search(/[*+-]/g) > -1 ? "ul" : "ol";
              return parseConsecutiveLists(list, listType, true);
            });
          } else {
            text = text.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function (wholeMatch, m1, list, m3) {
              var listType = m3.search(/[*+-]/g) > -1 ? "ul" : "ol";
              return parseConsecutiveLists(list, listType, false);
            });
          }
          text = text.replace(/¨0/, "");
          text = globals.converter._dispatch("lists.after", text, options, globals);
          return text;
        });
        showdown.subParser("metadata", function (text, options, globals) {
          if (!options.metadata) {
            return text;
          }
          text = globals.converter._dispatch("metadata.before", text, options, globals);
          function parseMetadataContents(content) {
            globals.metadata.raw = content;
            content = content.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
            content = content.replace(/\n {4}/g, " ");
            content.replace(/^([\S ]+): +([\s\S]+?)$/gm, function (wm, key, value) {
              globals.metadata.parsed[key] = value;
              return "";
            });
          }
          text = text.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function (wholematch, format, content) {
            parseMetadataContents(content);
            return "¨M";
          });
          text = text.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function (wholematch, format, content) {
            if (format) {
              globals.metadata.format = format;
            }
            parseMetadataContents(content);
            return "¨M";
          });
          text = text.replace(/¨M/g, "");
          text = globals.converter._dispatch("metadata.after", text, options, globals);
          return text;
        });
        showdown.subParser("outdent", function (text, options, globals) {
          text = globals.converter._dispatch("outdent.before", text, options, globals);
          text = text.replace(/^(\t|[ ]{1,4})/gm, "¨0");
          text = text.replace(/¨0/g, "");
          text = globals.converter._dispatch("outdent.after", text, options, globals);
          return text;
        });
        showdown.subParser("paragraphs", function (text, options, globals) {
          text = globals.converter._dispatch("paragraphs.before", text, options, globals);
          text = text.replace(/^\n+/g, "");
          text = text.replace(/\n+$/g, "");
          var grafs = text.split(/\n{2,}/g), grafsOut = [], end = grafs.length;
          for (var i = 0; i < end; i++) {
            var str = grafs[i];
            if (str.search(/¨(K|G)(\d+)\1/g) >= 0) {
              grafsOut.push(str);
            } else if (str.search(/\S/) >= 0) {
              str = showdown.subParser("spanGamut")(str, options, globals);
              str = str.replace(/^([ \t]*)/g, "<p>");
              str += "</p>";
              grafsOut.push(str);
            }
          }
          end = grafsOut.length;
          for (i = 0; i < end; i++) {
            var blockText = "", grafsOutIt = grafsOut[i], codeFlag = false;
            while ((/¨(K|G)(\d+)\1/).test(grafsOutIt)) {
              var delim = RegExp.$1, num = RegExp.$2;
              if (delim === "K") {
                blockText = globals.gHtmlBlocks[num];
              } else {
                if (codeFlag) {
                  blockText = showdown.subParser("encodeCode")(globals.ghCodeBlocks[num].text, options, globals);
                } else {
                  blockText = globals.ghCodeBlocks[num].codeblock;
                }
              }
              blockText = blockText.replace(/\$/g, "$$$$");
              grafsOutIt = grafsOutIt.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, blockText);
              if ((/^<pre\b[^>]*>\s*<code\b[^>]*>/).test(grafsOutIt)) {
                codeFlag = true;
              }
            }
            grafsOut[i] = grafsOutIt;
          }
          text = grafsOut.join("\n");
          text = text.replace(/^\n+/g, "");
          text = text.replace(/\n+$/g, "");
          return globals.converter._dispatch("paragraphs.after", text, options, globals);
        });
        showdown.subParser("runExtension", function (ext, text, options, globals) {
          if (ext.filter) {
            text = ext.filter(text, globals.converter, options);
          } else if (ext.regex) {
            var re = ext.regex;
            if (!(re instanceof RegExp)) {
              re = new RegExp(re, "g");
            }
            text = text.replace(re, ext.replace);
          }
          return text;
        });
        showdown.subParser("spanGamut", function (text, options, globals) {
          text = globals.converter._dispatch("spanGamut.before", text, options, globals);
          text = showdown.subParser("codeSpans")(text, options, globals);
          text = showdown.subParser("escapeSpecialCharsWithinTagAttributes")(text, options, globals);
          text = showdown.subParser("encodeBackslashEscapes")(text, options, globals);
          text = showdown.subParser("images")(text, options, globals);
          text = showdown.subParser("anchors")(text, options, globals);
          text = showdown.subParser("autoLinks")(text, options, globals);
          text = showdown.subParser("simplifiedAutoLinks")(text, options, globals);
          text = showdown.subParser("emoji")(text, options, globals);
          text = showdown.subParser("underline")(text, options, globals);
          text = showdown.subParser("italicsAndBold")(text, options, globals);
          text = showdown.subParser("strikethrough")(text, options, globals);
          text = showdown.subParser("ellipsis")(text, options, globals);
          text = showdown.subParser("hashHTMLSpans")(text, options, globals);
          text = showdown.subParser("encodeAmpsAndAngles")(text, options, globals);
          if (options.simpleLineBreaks) {
            if (!(/\n\n¨K/).test(text)) {
              text = text.replace(/\n+/g, "<br />\n");
            }
          } else {
            text = text.replace(/  +\n/g, "<br />\n");
          }
          text = globals.converter._dispatch("spanGamut.after", text, options, globals);
          return text;
        });
        showdown.subParser("strikethrough", function (text, options, globals) {
          function parseInside(txt) {
            if (options.simplifiedAutoLink) {
              txt = showdown.subParser("simplifiedAutoLinks")(txt, options, globals);
            }
            return "<del>" + txt + "</del>";
          }
          if (options.strikethrough) {
            text = globals.converter._dispatch("strikethrough.before", text, options, globals);
            text = text.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function (wm, txt) {
              return parseInside(txt);
            });
            text = globals.converter._dispatch("strikethrough.after", text, options, globals);
          }
          return text;
        });
        showdown.subParser("stripLinkDefinitions", function (text, options, globals) {
          var regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, base64Regex = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
          text += "¨0";
          var replaceFunc = function (wholeMatch, linkId, url, width, height, blankLines, title) {
            linkId = linkId.toLowerCase();
            if (text.toLowerCase().split(linkId).length - 1 < 2) {
              return wholeMatch;
            }
            if (url.match(/^data:.+?\/.+?;base64,/)) {
              globals.gUrls[linkId] = url.replace(/\s/g, "");
            } else {
              globals.gUrls[linkId] = showdown.subParser("encodeAmpsAndAngles")(url, options, globals);
            }
            if (blankLines) {
              return blankLines + title;
            } else {
              if (title) {
                globals.gTitles[linkId] = title.replace(/"|'/g, "&quot;");
              }
              if (options.parseImgDimensions && width && height) {
                globals.gDimensions[linkId] = {
                  width: width,
                  height: height
                };
              }
            }
            return "";
          };
          text = text.replace(base64Regex, replaceFunc);
          text = text.replace(regex, replaceFunc);
          text = text.replace(/¨0/, "");
          return text;
        });
        showdown.subParser("tables", function (text, options, globals) {
          if (!options.tables) {
            return text;
          }
          var tableRgx = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, singeColTblRgx = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
          function parseStyles(sLine) {
            if ((/^:[ \t]*--*$/).test(sLine)) {
              return " style=\"text-align:left;\"";
            } else if ((/^--*[ \t]*:[ \t]*$/).test(sLine)) {
              return " style=\"text-align:right;\"";
            } else if ((/^:[ \t]*--*[ \t]*:$/).test(sLine)) {
              return " style=\"text-align:center;\"";
            } else {
              return "";
            }
          }
          function parseHeaders(header, style) {
            var id = "";
            header = header.trim();
            if (options.tablesHeaderId || options.tableHeaderId) {
              id = " id=\"" + header.replace(/ /g, "_").toLowerCase() + "\"";
            }
            header = showdown.subParser("spanGamut")(header, options, globals);
            return "<th" + id + style + ">" + header + "</th>\n";
          }
          function parseCells(cell, style) {
            var subText = showdown.subParser("spanGamut")(cell, options, globals);
            return "<td" + style + ">" + subText + "</td>\n";
          }
          function buildTable(headers, cells) {
            var tb = "<table>\n<thead>\n<tr>\n", tblLgn = headers.length;
            for (var i = 0; i < tblLgn; ++i) {
              tb += headers[i];
            }
            tb += "</tr>\n</thead>\n<tbody>\n";
            for (i = 0; i < cells.length; ++i) {
              tb += "<tr>\n";
              for (var ii = 0; ii < tblLgn; ++ii) {
                tb += cells[i][ii];
              }
              tb += "</tr>\n";
            }
            tb += "</tbody>\n</table>\n";
            return tb;
          }
          function parseTable(rawTable) {
            var i, tableLines = rawTable.split("\n");
            for (i = 0; i < tableLines.length; ++i) {
              if ((/^ {0,3}\|/).test(tableLines[i])) {
                tableLines[i] = tableLines[i].replace(/^ {0,3}\|/, "");
              }
              if ((/\|[ \t]*$/).test(tableLines[i])) {
                tableLines[i] = tableLines[i].replace(/\|[ \t]*$/, "");
              }
              tableLines[i] = showdown.subParser("codeSpans")(tableLines[i], options, globals);
            }
            var rawHeaders = tableLines[0].split("|").map(function (s) {
              return s.trim();
            }), rawStyles = tableLines[1].split("|").map(function (s) {
              return s.trim();
            }), rawCells = [], headers = [], styles = [], cells = [];
            tableLines.shift();
            tableLines.shift();
            for (i = 0; i < tableLines.length; ++i) {
              if (tableLines[i].trim() === "") {
                continue;
              }
              rawCells.push(tableLines[i].split("|").map(function (s) {
                return s.trim();
              }));
            }
            if (rawHeaders.length < rawStyles.length) {
              return rawTable;
            }
            for (i = 0; i < rawStyles.length; ++i) {
              styles.push(parseStyles(rawStyles[i]));
            }
            for (i = 0; i < rawHeaders.length; ++i) {
              if (showdown.helper.isUndefined(styles[i])) {
                styles[i] = "";
              }
              headers.push(parseHeaders(rawHeaders[i], styles[i]));
            }
            for (i = 0; i < rawCells.length; ++i) {
              var row = [];
              for (var ii = 0; ii < headers.length; ++ii) {
                if (showdown.helper.isUndefined(rawCells[i][ii])) ;
                row.push(parseCells(rawCells[i][ii], styles[ii]));
              }
              cells.push(row);
            }
            return buildTable(headers, cells);
          }
          text = globals.converter._dispatch("tables.before", text, options, globals);
          text = text.replace(/\\(\|)/g, showdown.helper.escapeCharactersCallback);
          text = text.replace(tableRgx, parseTable);
          text = text.replace(singeColTblRgx, parseTable);
          text = globals.converter._dispatch("tables.after", text, options, globals);
          return text;
        });
        showdown.subParser("underline", function (text, options, globals) {
          if (!options.underline) {
            return text;
          }
          text = globals.converter._dispatch("underline.before", text, options, globals);
          if (options.literalMidWordUnderscores) {
            text = text.replace(/\b___(\S[\s\S]*?)___\b/g, function (wm, txt) {
              return "<u>" + txt + "</u>";
            });
            text = text.replace(/\b__(\S[\s\S]*?)__\b/g, function (wm, txt) {
              return "<u>" + txt + "</u>";
            });
          } else {
            text = text.replace(/___(\S[\s\S]*?)___/g, function (wm, m) {
              return (/\S$/).test(m) ? "<u>" + m + "</u>" : wm;
            });
            text = text.replace(/__(\S[\s\S]*?)__/g, function (wm, m) {
              return (/\S$/).test(m) ? "<u>" + m + "</u>" : wm;
            });
          }
          text = text.replace(/(_)/g, showdown.helper.escapeCharactersCallback);
          text = globals.converter._dispatch("underline.after", text, options, globals);
          return text;
        });
        showdown.subParser("unescapeSpecialChars", function (text, options, globals) {
          text = globals.converter._dispatch("unescapeSpecialChars.before", text, options, globals);
          text = text.replace(/¨E(\d+)E/g, function (wholeMatch, m1) {
            var charCodeToReplace = parseInt(m1);
            return String.fromCharCode(charCodeToReplace);
          });
          text = globals.converter._dispatch("unescapeSpecialChars.after", text, options, globals);
          return text;
        });
        showdown.subParser("makeMarkdown.blockquote", function (node, globals) {
          var txt = "";
          if (node.hasChildNodes()) {
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              var innerTxt = showdown.subParser("makeMarkdown.node")(children[i], globals);
              if (innerTxt === "") {
                continue;
              }
              txt += innerTxt;
            }
          }
          txt = txt.trim();
          txt = "> " + txt.split("\n").join("\n> ");
          return txt;
        });
        showdown.subParser("makeMarkdown.codeBlock", function (node, globals) {
          var lang = node.getAttribute("language"), num = node.getAttribute("precodenum");
          return "```" + lang + "\n" + globals.preList[num] + "\n```";
        });
        showdown.subParser("makeMarkdown.codeSpan", function (node) {
          return "`" + node.innerHTML + "`";
        });
        showdown.subParser("makeMarkdown.emphasis", function (node, globals) {
          var txt = "";
          if (node.hasChildNodes()) {
            txt += "*";
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
            }
            txt += "*";
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.header", function (node, globals, headerLevel) {
          var headerMark = new Array(headerLevel + 1).join("#"), txt = "";
          if (node.hasChildNodes()) {
            txt = headerMark + " ";
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
            }
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.hr", function () {
          return "---";
        });
        showdown.subParser("makeMarkdown.image", function (node) {
          var txt = "";
          if (node.hasAttribute("src")) {
            txt += "![" + node.getAttribute("alt") + "](";
            txt += "<" + node.getAttribute("src") + ">";
            if (node.hasAttribute("width") && node.hasAttribute("height")) {
              txt += " =" + node.getAttribute("width") + "x" + node.getAttribute("height");
            }
            if (node.hasAttribute("title")) {
              txt += " \"" + node.getAttribute("title") + "\"";
            }
            txt += ")";
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.links", function (node, globals) {
          var txt = "";
          if (node.hasChildNodes() && node.hasAttribute("href")) {
            var children = node.childNodes, childrenLength = children.length;
            txt = "[";
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
            }
            txt += "](";
            txt += "<" + node.getAttribute("href") + ">";
            if (node.hasAttribute("title")) {
              txt += " \"" + node.getAttribute("title") + "\"";
            }
            txt += ")";
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.list", function (node, globals, type) {
          var txt = "";
          if (!node.hasChildNodes()) {
            return "";
          }
          var listItems = node.childNodes, listItemsLenght = listItems.length, listNum = node.getAttribute("start") || 1;
          for (var i = 0; i < listItemsLenght; ++i) {
            if (typeof listItems[i].tagName === "undefined" || listItems[i].tagName.toLowerCase() !== "li") {
              continue;
            }
            var bullet = "";
            if (type === "ol") {
              bullet = listNum.toString() + ". ";
            } else {
              bullet = "- ";
            }
            txt += bullet + showdown.subParser("makeMarkdown.listItem")(listItems[i], globals);
            ++listNum;
          }
          txt += "\n<!-- -->\n";
          return txt.trim();
        });
        showdown.subParser("makeMarkdown.listItem", function (node, globals) {
          var listItemTxt = "";
          var children = node.childNodes, childrenLenght = children.length;
          for (var i = 0; i < childrenLenght; ++i) {
            listItemTxt += showdown.subParser("makeMarkdown.node")(children[i], globals);
          }
          if (!(/\n$/).test(listItemTxt)) {
            listItemTxt += "\n";
          } else {
            listItemTxt = listItemTxt.split("\n").join("\n    ").replace(/^ {4}$/gm, "").replace(/\n\n+/g, "\n\n");
          }
          return listItemTxt;
        });
        showdown.subParser("makeMarkdown.node", function (node, globals, spansOnly) {
          spansOnly = spansOnly || false;
          var txt = "";
          if (node.nodeType === 3) {
            return showdown.subParser("makeMarkdown.txt")(node, globals);
          }
          if (node.nodeType === 8) {
            return "<!--" + node.data + "-->\n\n";
          }
          if (node.nodeType !== 1) {
            return "";
          }
          var tagName = node.tagName.toLowerCase();
          switch (tagName) {
            case "h1":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.header")(node, globals, 1) + "\n\n";
              }
              break;
            case "h2":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.header")(node, globals, 2) + "\n\n";
              }
              break;
            case "h3":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.header")(node, globals, 3) + "\n\n";
              }
              break;
            case "h4":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.header")(node, globals, 4) + "\n\n";
              }
              break;
            case "h5":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.header")(node, globals, 5) + "\n\n";
              }
              break;
            case "h6":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.header")(node, globals, 6) + "\n\n";
              }
              break;
            case "p":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.paragraph")(node, globals) + "\n\n";
              }
              break;
            case "blockquote":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.blockquote")(node, globals) + "\n\n";
              }
              break;
            case "hr":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.hr")(node, globals) + "\n\n";
              }
              break;
            case "ol":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.list")(node, globals, "ol") + "\n\n";
              }
              break;
            case "ul":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.list")(node, globals, "ul") + "\n\n";
              }
              break;
            case "precode":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.codeBlock")(node, globals) + "\n\n";
              }
              break;
            case "pre":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.pre")(node, globals) + "\n\n";
              }
              break;
            case "table":
              if (!spansOnly) {
                txt = showdown.subParser("makeMarkdown.table")(node, globals) + "\n\n";
              }
              break;
            case "code":
              txt = showdown.subParser("makeMarkdown.codeSpan")(node, globals);
              break;
            case "em":
            case "i":
              txt = showdown.subParser("makeMarkdown.emphasis")(node, globals);
              break;
            case "strong":
            case "b":
              txt = showdown.subParser("makeMarkdown.strong")(node, globals);
              break;
            case "del":
              txt = showdown.subParser("makeMarkdown.strikethrough")(node, globals);
              break;
            case "a":
              txt = showdown.subParser("makeMarkdown.links")(node, globals);
              break;
            case "img":
              txt = showdown.subParser("makeMarkdown.image")(node, globals);
              break;
            default:
              txt = node.outerHTML + "\n\n";
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.paragraph", function (node, globals) {
          var txt = "";
          if (node.hasChildNodes()) {
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
            }
          }
          txt = txt.trim();
          return txt;
        });
        showdown.subParser("makeMarkdown.pre", function (node, globals) {
          var num = node.getAttribute("prenum");
          return "<pre>" + globals.preList[num] + "</pre>";
        });
        showdown.subParser("makeMarkdown.strikethrough", function (node, globals) {
          var txt = "";
          if (node.hasChildNodes()) {
            txt += "~~";
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
            }
            txt += "~~";
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.strong", function (node, globals) {
          var txt = "";
          if (node.hasChildNodes()) {
            txt += "**";
            var children = node.childNodes, childrenLength = children.length;
            for (var i = 0; i < childrenLength; ++i) {
              txt += showdown.subParser("makeMarkdown.node")(children[i], globals);
            }
            txt += "**";
          }
          return txt;
        });
        showdown.subParser("makeMarkdown.table", function (node, globals) {
          var txt = "", tableArray = [[], []], headings = node.querySelectorAll("thead>tr>th"), rows = node.querySelectorAll("tbody>tr"), i, ii;
          for (i = 0; i < headings.length; ++i) {
            var headContent = showdown.subParser("makeMarkdown.tableCell")(headings[i], globals), allign = "---";
            if (headings[i].hasAttribute("style")) {
              var style = headings[i].getAttribute("style").toLowerCase().replace(/\s/g, "");
              switch (style) {
                case "text-align:left;":
                  allign = ":---";
                  break;
                case "text-align:right;":
                  allign = "---:";
                  break;
                case "text-align:center;":
                  allign = ":---:";
                  break;
              }
            }
            tableArray[0][i] = headContent.trim();
            tableArray[1][i] = allign;
          }
          for (i = 0; i < rows.length; ++i) {
            var r = tableArray.push([]) - 1, cols = rows[i].getElementsByTagName("td");
            for (ii = 0; ii < headings.length; ++ii) {
              var cellContent = " ";
              if (typeof cols[ii] !== "undefined") {
                cellContent = showdown.subParser("makeMarkdown.tableCell")(cols[ii], globals);
              }
              tableArray[r].push(cellContent);
            }
          }
          var cellSpacesCount = 3;
          for (i = 0; i < tableArray.length; ++i) {
            for (ii = 0; ii < tableArray[i].length; ++ii) {
              var strLen = tableArray[i][ii].length;
              if (strLen > cellSpacesCount) {
                cellSpacesCount = strLen;
              }
            }
          }
          for (i = 0; i < tableArray.length; ++i) {
            for (ii = 0; ii < tableArray[i].length; ++ii) {
              if (i === 1) {
                if (tableArray[i][ii].slice(-1) === ":") {
                  tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii].slice(-1), cellSpacesCount - 1, "-") + ":";
                } else {
                  tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount, "-");
                }
              } else {
                tableArray[i][ii] = showdown.helper.padEnd(tableArray[i][ii], cellSpacesCount);
              }
            }
            txt += "| " + tableArray[i].join(" | ") + " |\n";
          }
          return txt.trim();
        });
        showdown.subParser("makeMarkdown.tableCell", function (node, globals) {
          var txt = "";
          if (!node.hasChildNodes()) {
            return "";
          }
          var children = node.childNodes, childrenLength = children.length;
          for (var i = 0; i < childrenLength; ++i) {
            txt += showdown.subParser("makeMarkdown.node")(children[i], globals, true);
          }
          return txt.trim();
        });
        showdown.subParser("makeMarkdown.txt", function (node) {
          var txt = node.nodeValue;
          txt = txt.replace(/ +/g, " ");
          txt = txt.replace(/¨NBSP;/g, " ");
          txt = showdown.helper.unescapeHTMLEntities(txt);
          txt = txt.replace(/([*_~|`])/g, "\\$1");
          txt = txt.replace(/^(\s*)>/g, "\\$1>");
          txt = txt.replace(/^#/gm, "\\#");
          txt = txt.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3");
          txt = txt.replace(/^( {0,3}\d+)\./gm, "$1\\.");
          txt = txt.replace(/^( {0,3})([+-])/gm, "$1\\$2");
          txt = txt.replace(/]([\s]*)\(/g, "\\]$1\\(");
          txt = txt.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:");
          return txt;
        });
        var root = this;
        if (module.exports) {
          module.exports = showdown;
        } else {
          root.showdown = showdown;
        }
      }).call(commonjsGlobal);
    })(showdown$1);
    var showdown = showdownExports;

    return showdown;

}));

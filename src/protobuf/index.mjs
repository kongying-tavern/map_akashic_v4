/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-mixed-operators, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars, default-case, jsdoc/require-param*/
import $protobuf from "protobufjs/minimal.js";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
const $Object = $util.global.Object, $undefined = $util.global.undefined, $Error = $util.global.Error, $Array = $util.global.Array, $TypeError = $util.global.TypeError, $Number = $util.global.Number, $parseInt = $util.global.parseInt, $String = $util.global.String, $BigInt = $util.global.BigInt, $Boolean = $util.global.Boolean, $isFinite = $util.global.isFinite;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const kongying = $root.kongying = (() => {

    /**
     * Namespace kongying.
     * @exports kongying
     * @namespace
     */
    const kongying = {};

    kongying.MarkerVo = (function() {

        /**
         * Properties of a MarkerVo.
         * @typedef {Object} kongying.MarkerVo.$Properties
         * @property {number|Long|null} [version] MarkerVo version
         * @property {number|Long|null} [id] MarkerVo id
         * @property {number|Long|null} [creatorId] MarkerVo creatorId
         * @property {number|Long|null} [createTime] MarkerVo createTime
         * @property {number|Long|null} [updaterId] MarkerVo updaterId
         * @property {number|Long|null} [updateTime] MarkerVo updateTime
         * @property {string|null} [markerTitle] MarkerVo markerTitle
         * @property {string|null} [position] MarkerVo position
         * @property {string|null} [content] MarkerVo content
         * @property {string|null} [picture] MarkerVo picture
         * @property {string|null} [videoPath] MarkerVo videoPath
         * @property {number|Long|null} [refreshTime] MarkerVo refreshTime
         * @property {number|null} [hiddenFlag] MarkerVo hiddenFlag
         * @property {Array.<kongying.MarkerItemLinkVo.$Properties>|null} [itemList] MarkerVo itemList
         * @property {number|Long|null} [markerCreatorId] MarkerVo markerCreatorId
         * @property {number|Long|null} [pictureCreatorId] MarkerVo pictureCreatorId
         * @property {string|null} [markerStamp] MarkerVo markerStamp
         * @property {kongying.MarkerExtra.$Properties|null} [extra] MarkerVo extra
         * @property {string|null} [linkageId] MarkerVo linkageId
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a MarkerVo.
         * @memberof kongying
         * @interface IMarkerVo
         * @augments kongying.MarkerVo.$Properties
         * @deprecated Use kongying.MarkerVo.$Properties instead.
         */

        /**
         * Shape of a MarkerVo.
         * @typedef {kongying.MarkerVo.$Properties} kongying.MarkerVo.$Shape
         */

        /**
         * Constructs a new MarkerVo.
         * @memberof kongying
         * @classdesc Represents a MarkerVo.
         * @constructor
         * @param {kongying.MarkerVo.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const MarkerVo = function (properties) {
            this.itemList = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * MarkerVo version.
         * @member {number|Long} version
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.version = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MarkerVo id.
         * @member {number|Long} id
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MarkerVo creatorId.
         * @member {number|Long} creatorId
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.creatorId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MarkerVo createTime.
         * @member {number|Long|null|undefined} createTime
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.createTime = null;

        /**
         * MarkerVo updaterId.
         * @member {number|Long} updaterId
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.updaterId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MarkerVo updateTime.
         * @member {number|Long|null|undefined} updateTime
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.updateTime = null;

        /**
         * MarkerVo markerTitle.
         * @member {string} markerTitle
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.markerTitle = "";

        /**
         * MarkerVo position.
         * @member {string} position
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.position = "";

        /**
         * MarkerVo content.
         * @member {string} content
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.content = "";

        /**
         * MarkerVo picture.
         * @member {string} picture
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.picture = "";

        /**
         * MarkerVo videoPath.
         * @member {string} videoPath
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.videoPath = "";

        /**
         * MarkerVo refreshTime.
         * @member {number|Long} refreshTime
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.refreshTime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * MarkerVo hiddenFlag.
         * @member {number} hiddenFlag
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.hiddenFlag = 0;

        /**
         * MarkerVo itemList.
         * @member {Array.<kongying.MarkerItemLinkVo.$Properties>} itemList
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.itemList = $util.emptyArray;

        /**
         * MarkerVo markerCreatorId.
         * @member {number|Long|null|undefined} markerCreatorId
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.markerCreatorId = null;

        /**
         * MarkerVo pictureCreatorId.
         * @member {number|Long|null|undefined} pictureCreatorId
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.pictureCreatorId = null;

        /**
         * MarkerVo markerStamp.
         * @member {string} markerStamp
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.markerStamp = "";

        /**
         * MarkerVo extra.
         * @member {kongying.MarkerExtra.$Properties|null|undefined} extra
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.extra = null;

        /**
         * MarkerVo linkageId.
         * @member {string} linkageId
         * @memberof kongying.MarkerVo
         * @instance
         */
        MarkerVo.prototype.linkageId = "";

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MarkerVo.prototype, "_createTime", {
            get: $util.oneOfGetter($oneOfFields = ["createTime"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MarkerVo.prototype, "_updateTime", {
            get: $util.oneOfGetter($oneOfFields = ["updateTime"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MarkerVo.prototype, "_markerCreatorId", {
            get: $util.oneOfGetter($oneOfFields = ["markerCreatorId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MarkerVo.prototype, "_pictureCreatorId", {
            get: $util.oneOfGetter($oneOfFields = ["pictureCreatorId"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new MarkerVo instance using the specified properties.
         * @function create
         * @memberof kongying.MarkerVo
         * @static
         * @param {kongying.MarkerVo.$Properties=} [properties] Properties to set
         * @returns {kongying.MarkerVo} MarkerVo instance
         * @type {{
         *   (properties: kongying.MarkerVo.$Shape): kongying.MarkerVo & kongying.MarkerVo.$Shape;
         *   (properties?: kongying.MarkerVo.$Properties): kongying.MarkerVo;
         * }}
         */
        MarkerVo.create = function(properties) {
            return new MarkerVo(properties);
        };

        /**
         * Encodes the specified MarkerVo message. Does not implicitly {@link kongying.MarkerVo.verify|verify} messages.
         * @function encode
         * @memberof kongying.MarkerVo
         * @static
         * @param {kongying.MarkerVo.$Properties} message MarkerVo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerVo.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.version);
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.id);
            if (message.creatorId != null && $Object.hasOwnProperty.call(message, "creatorId"))
                writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.creatorId);
            if (message.createTime != null && $Object.hasOwnProperty.call(message, "createTime"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint64(message.createTime);
            if (message.updaterId != null && $Object.hasOwnProperty.call(message, "updaterId"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.updaterId);
            if (message.updateTime != null && $Object.hasOwnProperty.call(message, "updateTime"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.updateTime);
            if (message.markerTitle != null && $Object.hasOwnProperty.call(message, "markerTitle"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.markerTitle);
            if (message.position != null && $Object.hasOwnProperty.call(message, "position"))
                writer.uint32(/* id 9, wireType 2 =*/74).string(message.position);
            if (message.content != null && $Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.content);
            if (message.picture != null && $Object.hasOwnProperty.call(message, "picture"))
                writer.uint32(/* id 11, wireType 2 =*/90).string(message.picture);
            if (message.videoPath != null && $Object.hasOwnProperty.call(message, "videoPath"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.videoPath);
            if (message.refreshTime != null && $Object.hasOwnProperty.call(message, "refreshTime"))
                writer.uint32(/* id 13, wireType 0 =*/104).int64(message.refreshTime);
            if (message.hiddenFlag != null && $Object.hasOwnProperty.call(message, "hiddenFlag"))
                writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.hiddenFlag);
            if (message.itemList != null && message.itemList.length)
                for (let i = 0; i < message.itemList.length; ++i)
                    $root.kongying.MarkerItemLinkVo.encode(message.itemList[i], writer.uint32(/* id 15, wireType 2 =*/122).fork(), _depth + 1).ldelim();
            if (message.markerCreatorId != null && $Object.hasOwnProperty.call(message, "markerCreatorId"))
                writer.uint32(/* id 100, wireType 0 =*/800).uint64(message.markerCreatorId);
            if (message.pictureCreatorId != null && $Object.hasOwnProperty.call(message, "pictureCreatorId"))
                writer.uint32(/* id 101, wireType 0 =*/808).uint64(message.pictureCreatorId);
            if (message.markerStamp != null && $Object.hasOwnProperty.call(message, "markerStamp"))
                writer.uint32(/* id 200, wireType 2 =*/1602).string(message.markerStamp);
            if (message.extra != null && $Object.hasOwnProperty.call(message, "extra"))
                $root.kongying.MarkerExtra.encode(message.extra, writer.uint32(/* id 400, wireType 2 =*/3202).fork(), _depth + 1).ldelim();
            if (message.linkageId != null && $Object.hasOwnProperty.call(message, "linkageId"))
                writer.uint32(/* id 500, wireType 2 =*/4002).string(message.linkageId);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified MarkerVo message, length delimited. Does not implicitly {@link kongying.MarkerVo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof kongying.MarkerVo
         * @static
         * @param {kongying.MarkerVo.$Properties} message MarkerVo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerVo.encodeDelimited = function(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MarkerVo message from the specified reader or buffer.
         * @function decode
         * @memberof kongying.MarkerVo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {kongying.MarkerVo & kongying.MarkerVo.$Shape} MarkerVo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerVo.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.kongying.MarkerVo(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                            message.version = value;
                        else
                            delete message.version;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                            message.id = value;
                        else
                            delete message.id;
                        continue;
                    }
                case 3: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                            message.creatorId = value;
                        else
                            delete message.creatorId;
                        continue;
                    }
                case 4: {
                        if (wireType !== 0)
                            break;
                        message.createTime = reader.uint64();
                        message._createTime = "createTime";
                        continue;
                    }
                case 5: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                            message.updaterId = value;
                        else
                            delete message.updaterId;
                        continue;
                    }
                case 6: {
                        if (wireType !== 0)
                            break;
                        message.updateTime = reader.uint64();
                        message._updateTime = "updateTime";
                        continue;
                    }
                case 8: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.markerTitle = value;
                        else
                            delete message.markerTitle;
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.position = value;
                        else
                            delete message.position;
                        continue;
                    }
                case 10: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.content = value;
                        else
                            delete message.content;
                        continue;
                    }
                case 11: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.picture = value;
                        else
                            delete message.picture;
                        continue;
                    }
                case 12: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.videoPath = value;
                        else
                            delete message.videoPath;
                        continue;
                    }
                case 13: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                            message.refreshTime = value;
                        else
                            delete message.refreshTime;
                        continue;
                    }
                case 14: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.uint32())
                            message.hiddenFlag = value;
                        else
                            delete message.hiddenFlag;
                        continue;
                    }
                case 15: {
                        if (wireType !== 2)
                            break;
                        if (!(message.itemList && message.itemList.length))
                            message.itemList = [];
                        message.itemList.push($root.kongying.MarkerItemLinkVo.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 100: {
                        if (wireType !== 0)
                            break;
                        message.markerCreatorId = reader.uint64();
                        message._markerCreatorId = "markerCreatorId";
                        continue;
                    }
                case 101: {
                        if (wireType !== 0)
                            break;
                        message.pictureCreatorId = reader.uint64();
                        message._pictureCreatorId = "pictureCreatorId";
                        continue;
                    }
                case 200: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.markerStamp = value;
                        else
                            delete message.markerStamp;
                        continue;
                    }
                case 400: {
                        if (wireType !== 2)
                            break;
                        message.extra = $root.kongying.MarkerExtra.decode(reader, reader.uint32(), $undefined, _depth + 1, message.extra);
                        continue;
                    }
                case 500: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.linkageId = value;
                        else
                            delete message.linkageId;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a MarkerVo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof kongying.MarkerVo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {kongying.MarkerVo & kongying.MarkerVo.$Shape} MarkerVo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerVo.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MarkerVo message.
         * @function verify
         * @memberof kongying.MarkerVo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MarkerVo.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
                if (!$util.isInteger(message.version) && !(message.version && $util.isInteger(message.version.low) && $util.isInteger(message.version.high)))
                    return "version: integer|Long expected";
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.creatorId != null && $Object.hasOwnProperty.call(message, "creatorId"))
                if (!$util.isInteger(message.creatorId) && !(message.creatorId && $util.isInteger(message.creatorId.low) && $util.isInteger(message.creatorId.high)))
                    return "creatorId: integer|Long expected";
            if (message.createTime != null && $Object.hasOwnProperty.call(message, "createTime")) {
                properties._createTime = 1;
                if (!$util.isInteger(message.createTime) && !(message.createTime && $util.isInteger(message.createTime.low) && $util.isInteger(message.createTime.high)))
                    return "createTime: integer|Long expected";
            }
            if (message.updaterId != null && $Object.hasOwnProperty.call(message, "updaterId"))
                if (!$util.isInteger(message.updaterId) && !(message.updaterId && $util.isInteger(message.updaterId.low) && $util.isInteger(message.updaterId.high)))
                    return "updaterId: integer|Long expected";
            if (message.updateTime != null && $Object.hasOwnProperty.call(message, "updateTime")) {
                properties._updateTime = 1;
                if (!$util.isInteger(message.updateTime) && !(message.updateTime && $util.isInteger(message.updateTime.low) && $util.isInteger(message.updateTime.high)))
                    return "updateTime: integer|Long expected";
            }
            if (message.markerTitle != null && $Object.hasOwnProperty.call(message, "markerTitle"))
                if (!$util.isString(message.markerTitle))
                    return "markerTitle: string expected";
            if (message.position != null && $Object.hasOwnProperty.call(message, "position"))
                if (!$util.isString(message.position))
                    return "position: string expected";
            if (message.content != null && $Object.hasOwnProperty.call(message, "content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            if (message.picture != null && $Object.hasOwnProperty.call(message, "picture"))
                if (!$util.isString(message.picture))
                    return "picture: string expected";
            if (message.videoPath != null && $Object.hasOwnProperty.call(message, "videoPath"))
                if (!$util.isString(message.videoPath))
                    return "videoPath: string expected";
            if (message.refreshTime != null && $Object.hasOwnProperty.call(message, "refreshTime"))
                if (!$util.isInteger(message.refreshTime) && !(message.refreshTime && $util.isInteger(message.refreshTime.low) && $util.isInteger(message.refreshTime.high)))
                    return "refreshTime: integer|Long expected";
            if (message.hiddenFlag != null && $Object.hasOwnProperty.call(message, "hiddenFlag"))
                if (!$util.isInteger(message.hiddenFlag))
                    return "hiddenFlag: integer expected";
            if (message.itemList != null && $Object.hasOwnProperty.call(message, "itemList")) {
                if (!$Array.isArray(message.itemList))
                    return "itemList: array expected";
                for (let i = 0; i < message.itemList.length; ++i) {
                    let error = $root.kongying.MarkerItemLinkVo.verify(message.itemList[i], _depth + 1);
                    if (error)
                        return "itemList." + error;
                }
            }
            if (message.markerCreatorId != null && $Object.hasOwnProperty.call(message, "markerCreatorId")) {
                properties._markerCreatorId = 1;
                if (!$util.isInteger(message.markerCreatorId) && !(message.markerCreatorId && $util.isInteger(message.markerCreatorId.low) && $util.isInteger(message.markerCreatorId.high)))
                    return "markerCreatorId: integer|Long expected";
            }
            if (message.pictureCreatorId != null && $Object.hasOwnProperty.call(message, "pictureCreatorId")) {
                properties._pictureCreatorId = 1;
                if (!$util.isInteger(message.pictureCreatorId) && !(message.pictureCreatorId && $util.isInteger(message.pictureCreatorId.low) && $util.isInteger(message.pictureCreatorId.high)))
                    return "pictureCreatorId: integer|Long expected";
            }
            if (message.markerStamp != null && $Object.hasOwnProperty.call(message, "markerStamp"))
                if (!$util.isString(message.markerStamp))
                    return "markerStamp: string expected";
            if (message.extra != null && $Object.hasOwnProperty.call(message, "extra")) {
                let error = $root.kongying.MarkerExtra.verify(message.extra, _depth + 1);
                if (error)
                    return "extra." + error;
            }
            if (message.linkageId != null && $Object.hasOwnProperty.call(message, "linkageId"))
                if (!$util.isString(message.linkageId))
                    return "linkageId: string expected";
            return null;
        };

        /**
         * Creates a MarkerVo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof kongying.MarkerVo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {kongying.MarkerVo} MarkerVo
         */
        MarkerVo.fromObject = function (object, _depth) {
            if (object instanceof $root.kongying.MarkerVo)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".kongying.MarkerVo: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.kongying.MarkerVo();
            if (object.version != null)
                if (typeof object.version === "object" ? object.version.low || object.version.high : $Number(object.version) !== 0)
                    if ($util.Long)
                        message.version = $util.Long.fromValue(object.version, true);
                    else if (typeof object.version === "string")
                        message.version = $parseInt(object.version, 10);
                    else if (typeof object.version === "number")
                        message.version = object.version;
                    else if (typeof object.version === "object")
                        message.version = new $util.LongBits(object.version.low >>> 0, object.version.high >>> 0).toNumber(true);
            if (object.id != null)
                if (typeof object.id === "object" ? object.id.low || object.id.high : $Number(object.id) !== 0)
                    if ($util.Long)
                        message.id = $util.Long.fromValue(object.id, true);
                    else if (typeof object.id === "string")
                        message.id = $parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.creatorId != null)
                if (typeof object.creatorId === "object" ? object.creatorId.low || object.creatorId.high : $Number(object.creatorId) !== 0)
                    if ($util.Long)
                        message.creatorId = $util.Long.fromValue(object.creatorId, true);
                    else if (typeof object.creatorId === "string")
                        message.creatorId = $parseInt(object.creatorId, 10);
                    else if (typeof object.creatorId === "number")
                        message.creatorId = object.creatorId;
                    else if (typeof object.creatorId === "object")
                        message.creatorId = new $util.LongBits(object.creatorId.low >>> 0, object.creatorId.high >>> 0).toNumber(true);
            if (object.createTime != null)
                if ($util.Long)
                    message.createTime = $util.Long.fromValue(object.createTime, true);
                else if (typeof object.createTime === "string")
                    message.createTime = $parseInt(object.createTime, 10);
                else if (typeof object.createTime === "number")
                    message.createTime = object.createTime;
                else if (typeof object.createTime === "object")
                    message.createTime = new $util.LongBits(object.createTime.low >>> 0, object.createTime.high >>> 0).toNumber(true);
            if (object.updaterId != null)
                if (typeof object.updaterId === "object" ? object.updaterId.low || object.updaterId.high : $Number(object.updaterId) !== 0)
                    if ($util.Long)
                        message.updaterId = $util.Long.fromValue(object.updaterId, true);
                    else if (typeof object.updaterId === "string")
                        message.updaterId = $parseInt(object.updaterId, 10);
                    else if (typeof object.updaterId === "number")
                        message.updaterId = object.updaterId;
                    else if (typeof object.updaterId === "object")
                        message.updaterId = new $util.LongBits(object.updaterId.low >>> 0, object.updaterId.high >>> 0).toNumber(true);
            if (object.updateTime != null)
                if ($util.Long)
                    message.updateTime = $util.Long.fromValue(object.updateTime, true);
                else if (typeof object.updateTime === "string")
                    message.updateTime = $parseInt(object.updateTime, 10);
                else if (typeof object.updateTime === "number")
                    message.updateTime = object.updateTime;
                else if (typeof object.updateTime === "object")
                    message.updateTime = new $util.LongBits(object.updateTime.low >>> 0, object.updateTime.high >>> 0).toNumber(true);
            if (object.markerTitle != null)
                if (typeof object.markerTitle !== "string" || object.markerTitle.length)
                    message.markerTitle = $String(object.markerTitle);
            if (object.position != null)
                if (typeof object.position !== "string" || object.position.length)
                    message.position = $String(object.position);
            if (object.content != null)
                if (typeof object.content !== "string" || object.content.length)
                    message.content = $String(object.content);
            if (object.picture != null)
                if (typeof object.picture !== "string" || object.picture.length)
                    message.picture = $String(object.picture);
            if (object.videoPath != null)
                if (typeof object.videoPath !== "string" || object.videoPath.length)
                    message.videoPath = $String(object.videoPath);
            if (object.refreshTime != null)
                if (typeof object.refreshTime === "object" ? object.refreshTime.low || object.refreshTime.high : $Number(object.refreshTime) !== 0)
                    if ($util.Long)
                        message.refreshTime = $util.Long.fromValue(object.refreshTime, false);
                    else if (typeof object.refreshTime === "string")
                        message.refreshTime = $parseInt(object.refreshTime, 10);
                    else if (typeof object.refreshTime === "number")
                        message.refreshTime = object.refreshTime;
                    else if (typeof object.refreshTime === "object")
                        message.refreshTime = new $util.LongBits(object.refreshTime.low >>> 0, object.refreshTime.high >>> 0).toNumber();
            if (object.hiddenFlag != null)
                if ($Number(object.hiddenFlag) !== 0)
                    message.hiddenFlag = object.hiddenFlag >>> 0;
            if (object.itemList) {
                if (!$Array.isArray(object.itemList))
                    throw $TypeError(".kongying.MarkerVo.itemList: array expected");
                message.itemList = $Array(object.itemList.length);
                for (let i = 0; i < object.itemList.length; ++i) {
                    if (!$util.isObject(object.itemList[i]))
                        throw $TypeError(".kongying.MarkerVo.itemList: object expected");
                    message.itemList[i] = $root.kongying.MarkerItemLinkVo.fromObject(object.itemList[i], _depth + 1);
                }
            }
            if (object.markerCreatorId != null)
                if ($util.Long)
                    message.markerCreatorId = $util.Long.fromValue(object.markerCreatorId, true);
                else if (typeof object.markerCreatorId === "string")
                    message.markerCreatorId = $parseInt(object.markerCreatorId, 10);
                else if (typeof object.markerCreatorId === "number")
                    message.markerCreatorId = object.markerCreatorId;
                else if (typeof object.markerCreatorId === "object")
                    message.markerCreatorId = new $util.LongBits(object.markerCreatorId.low >>> 0, object.markerCreatorId.high >>> 0).toNumber(true);
            if (object.pictureCreatorId != null)
                if ($util.Long)
                    message.pictureCreatorId = $util.Long.fromValue(object.pictureCreatorId, true);
                else if (typeof object.pictureCreatorId === "string")
                    message.pictureCreatorId = $parseInt(object.pictureCreatorId, 10);
                else if (typeof object.pictureCreatorId === "number")
                    message.pictureCreatorId = object.pictureCreatorId;
                else if (typeof object.pictureCreatorId === "object")
                    message.pictureCreatorId = new $util.LongBits(object.pictureCreatorId.low >>> 0, object.pictureCreatorId.high >>> 0).toNumber(true);
            if (object.markerStamp != null)
                if (typeof object.markerStamp !== "string" || object.markerStamp.length)
                    message.markerStamp = $String(object.markerStamp);
            if (object.extra != null) {
                if (!$util.isObject(object.extra))
                    throw $TypeError(".kongying.MarkerVo.extra: object expected");
                message.extra = $root.kongying.MarkerExtra.fromObject(object.extra, _depth + 1);
            }
            if (object.linkageId != null)
                if (typeof object.linkageId !== "string" || object.linkageId.length)
                    message.linkageId = $String(object.linkageId);
            return message;
        };

        /**
         * Creates a plain object from a MarkerVo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof kongying.MarkerVo
         * @static
         * @param {kongying.MarkerVo} message MarkerVo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MarkerVo.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.itemList = [];
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.version = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.version = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.id = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.id = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.creatorId = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.creatorId = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.updaterId = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.updaterId = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                object.markerTitle = "";
                object.position = "";
                object.content = "";
                object.picture = "";
                object.videoPath = "";
                if ($util.Long) {
                    let long = new $util.Long(0, 0, false);
                    object.refreshTime = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.refreshTime = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                object.hiddenFlag = 0;
                object.markerStamp = "";
                object.extra = null;
                object.linkageId = "";
            }
            if (message.version != null && $Object.hasOwnProperty.call(message, "version"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.version = typeof message.version === "number" ? $BigInt(message.version) : $util.Long.fromBits(message.version.low >>> 0, message.version.high >>> 0, true).toBigInt();
                else if (typeof message.version === "number")
                    object.version = options.longs === $String ? $String(message.version) : message.version;
                else
                    object.version = options.longs === $String ? $util.Long.prototype.toString.call(message.version) : options.longs === $Number ? new $util.LongBits(message.version.low >>> 0, message.version.high >>> 0).toNumber(true) : message.version;
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.id = typeof message.id === "number" ? $BigInt(message.id) : $util.Long.fromBits(message.id.low >>> 0, message.id.high >>> 0, true).toBigInt();
                else if (typeof message.id === "number")
                    object.id = options.longs === $String ? $String(message.id) : message.id;
                else
                    object.id = options.longs === $String ? $util.Long.prototype.toString.call(message.id) : options.longs === $Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.creatorId != null && $Object.hasOwnProperty.call(message, "creatorId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.creatorId = typeof message.creatorId === "number" ? $BigInt(message.creatorId) : $util.Long.fromBits(message.creatorId.low >>> 0, message.creatorId.high >>> 0, true).toBigInt();
                else if (typeof message.creatorId === "number")
                    object.creatorId = options.longs === $String ? $String(message.creatorId) : message.creatorId;
                else
                    object.creatorId = options.longs === $String ? $util.Long.prototype.toString.call(message.creatorId) : options.longs === $Number ? new $util.LongBits(message.creatorId.low >>> 0, message.creatorId.high >>> 0).toNumber(true) : message.creatorId;
            if (message.createTime != null && $Object.hasOwnProperty.call(message, "createTime"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.createTime = typeof message.createTime === "number" ? $BigInt(message.createTime) : $util.Long.fromBits(message.createTime.low >>> 0, message.createTime.high >>> 0, true).toBigInt();
                else if (typeof message.createTime === "number")
                    object.createTime = options.longs === $String ? $String(message.createTime) : message.createTime;
                else
                    object.createTime = options.longs === $String ? $util.Long.prototype.toString.call(message.createTime) : options.longs === $Number ? new $util.LongBits(message.createTime.low >>> 0, message.createTime.high >>> 0).toNumber(true) : message.createTime;
            if (message.updaterId != null && $Object.hasOwnProperty.call(message, "updaterId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.updaterId = typeof message.updaterId === "number" ? $BigInt(message.updaterId) : $util.Long.fromBits(message.updaterId.low >>> 0, message.updaterId.high >>> 0, true).toBigInt();
                else if (typeof message.updaterId === "number")
                    object.updaterId = options.longs === $String ? $String(message.updaterId) : message.updaterId;
                else
                    object.updaterId = options.longs === $String ? $util.Long.prototype.toString.call(message.updaterId) : options.longs === $Number ? new $util.LongBits(message.updaterId.low >>> 0, message.updaterId.high >>> 0).toNumber(true) : message.updaterId;
            if (message.updateTime != null && $Object.hasOwnProperty.call(message, "updateTime"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.updateTime = typeof message.updateTime === "number" ? $BigInt(message.updateTime) : $util.Long.fromBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0, true).toBigInt();
                else if (typeof message.updateTime === "number")
                    object.updateTime = options.longs === $String ? $String(message.updateTime) : message.updateTime;
                else
                    object.updateTime = options.longs === $String ? $util.Long.prototype.toString.call(message.updateTime) : options.longs === $Number ? new $util.LongBits(message.updateTime.low >>> 0, message.updateTime.high >>> 0).toNumber(true) : message.updateTime;
            if (message.markerTitle != null && $Object.hasOwnProperty.call(message, "markerTitle"))
                object.markerTitle = message.markerTitle;
            if (message.position != null && $Object.hasOwnProperty.call(message, "position"))
                object.position = message.position;
            if (message.content != null && $Object.hasOwnProperty.call(message, "content"))
                object.content = message.content;
            if (message.picture != null && $Object.hasOwnProperty.call(message, "picture"))
                object.picture = message.picture;
            if (message.videoPath != null && $Object.hasOwnProperty.call(message, "videoPath"))
                object.videoPath = message.videoPath;
            if (message.refreshTime != null && $Object.hasOwnProperty.call(message, "refreshTime"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.refreshTime = typeof message.refreshTime === "number" ? $BigInt(message.refreshTime) : $util.Long.fromBits(message.refreshTime.low >>> 0, message.refreshTime.high >>> 0, false).toBigInt();
                else if (typeof message.refreshTime === "number")
                    object.refreshTime = options.longs === $String ? $String(message.refreshTime) : message.refreshTime;
                else
                    object.refreshTime = options.longs === $String ? $util.Long.prototype.toString.call(message.refreshTime) : options.longs === $Number ? new $util.LongBits(message.refreshTime.low >>> 0, message.refreshTime.high >>> 0).toNumber() : message.refreshTime;
            if (message.hiddenFlag != null && $Object.hasOwnProperty.call(message, "hiddenFlag"))
                object.hiddenFlag = message.hiddenFlag;
            if (message.itemList && message.itemList.length) {
                object.itemList = $Array(message.itemList.length);
                for (let j = 0; j < message.itemList.length; ++j)
                    object.itemList[j] = $root.kongying.MarkerItemLinkVo.toObject(message.itemList[j], options, _depth + 1);
            }
            if (message.markerCreatorId != null && $Object.hasOwnProperty.call(message, "markerCreatorId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.markerCreatorId = typeof message.markerCreatorId === "number" ? $BigInt(message.markerCreatorId) : $util.Long.fromBits(message.markerCreatorId.low >>> 0, message.markerCreatorId.high >>> 0, true).toBigInt();
                else if (typeof message.markerCreatorId === "number")
                    object.markerCreatorId = options.longs === $String ? $String(message.markerCreatorId) : message.markerCreatorId;
                else
                    object.markerCreatorId = options.longs === $String ? $util.Long.prototype.toString.call(message.markerCreatorId) : options.longs === $Number ? new $util.LongBits(message.markerCreatorId.low >>> 0, message.markerCreatorId.high >>> 0).toNumber(true) : message.markerCreatorId;
            if (message.pictureCreatorId != null && $Object.hasOwnProperty.call(message, "pictureCreatorId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.pictureCreatorId = typeof message.pictureCreatorId === "number" ? $BigInt(message.pictureCreatorId) : $util.Long.fromBits(message.pictureCreatorId.low >>> 0, message.pictureCreatorId.high >>> 0, true).toBigInt();
                else if (typeof message.pictureCreatorId === "number")
                    object.pictureCreatorId = options.longs === $String ? $String(message.pictureCreatorId) : message.pictureCreatorId;
                else
                    object.pictureCreatorId = options.longs === $String ? $util.Long.prototype.toString.call(message.pictureCreatorId) : options.longs === $Number ? new $util.LongBits(message.pictureCreatorId.low >>> 0, message.pictureCreatorId.high >>> 0).toNumber(true) : message.pictureCreatorId;
            if (message.markerStamp != null && $Object.hasOwnProperty.call(message, "markerStamp"))
                object.markerStamp = message.markerStamp;
            if (message.extra != null && $Object.hasOwnProperty.call(message, "extra"))
                object.extra = $root.kongying.MarkerExtra.toObject(message.extra, options, _depth + 1);
            if (message.linkageId != null && $Object.hasOwnProperty.call(message, "linkageId"))
                object.linkageId = message.linkageId;
            return object;
        };

        /**
         * Converts this MarkerVo to JSON.
         * @function toJSON
         * @memberof kongying.MarkerVo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MarkerVo.prototype.toJSON = function() {
            return MarkerVo.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for MarkerVo
         * @function getTypeUrl
         * @memberof kongying.MarkerVo
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        MarkerVo.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/kongying.MarkerVo";
        };

        return MarkerVo;
    })();

    kongying.MarkerItemLinkVo = (function() {

        /**
         * Properties of a MarkerItemLinkVo.
         * @typedef {Object} kongying.MarkerItemLinkVo.$Properties
         * @property {number|Long|null} [itemId] MarkerItemLinkVo itemId
         * @property {number|Long|null} [iconId] MarkerItemLinkVo iconId
         * @property {number|null} [count] MarkerItemLinkVo count
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a MarkerItemLinkVo.
         * @memberof kongying
         * @interface IMarkerItemLinkVo
         * @augments kongying.MarkerItemLinkVo.$Properties
         * @deprecated Use kongying.MarkerItemLinkVo.$Properties instead.
         */

        /**
         * Shape of a MarkerItemLinkVo.
         * @typedef {kongying.MarkerItemLinkVo.$Properties} kongying.MarkerItemLinkVo.$Shape
         */

        /**
         * Constructs a new MarkerItemLinkVo.
         * @memberof kongying
         * @classdesc Represents a MarkerItemLinkVo.
         * @constructor
         * @param {kongying.MarkerItemLinkVo.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const MarkerItemLinkVo = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * MarkerItemLinkVo itemId.
         * @member {number|Long} itemId
         * @memberof kongying.MarkerItemLinkVo
         * @instance
         */
        MarkerItemLinkVo.prototype.itemId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MarkerItemLinkVo iconId.
         * @member {number|Long} iconId
         * @memberof kongying.MarkerItemLinkVo
         * @instance
         */
        MarkerItemLinkVo.prototype.iconId = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MarkerItemLinkVo count.
         * @member {number} count
         * @memberof kongying.MarkerItemLinkVo
         * @instance
         */
        MarkerItemLinkVo.prototype.count = 0;

        /**
         * Creates a new MarkerItemLinkVo instance using the specified properties.
         * @function create
         * @memberof kongying.MarkerItemLinkVo
         * @static
         * @param {kongying.MarkerItemLinkVo.$Properties=} [properties] Properties to set
         * @returns {kongying.MarkerItemLinkVo} MarkerItemLinkVo instance
         * @type {{
         *   (properties: kongying.MarkerItemLinkVo.$Shape): kongying.MarkerItemLinkVo & kongying.MarkerItemLinkVo.$Shape;
         *   (properties?: kongying.MarkerItemLinkVo.$Properties): kongying.MarkerItemLinkVo;
         * }}
         */
        MarkerItemLinkVo.create = function(properties) {
            return new MarkerItemLinkVo(properties);
        };

        /**
         * Encodes the specified MarkerItemLinkVo message. Does not implicitly {@link kongying.MarkerItemLinkVo.verify|verify} messages.
         * @function encode
         * @memberof kongying.MarkerItemLinkVo
         * @static
         * @param {kongying.MarkerItemLinkVo.$Properties} message MarkerItemLinkVo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerItemLinkVo.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.itemId != null && $Object.hasOwnProperty.call(message, "itemId"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.itemId);
            if (message.iconId != null && $Object.hasOwnProperty.call(message, "iconId"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.iconId);
            if (message.count != null && $Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 10, wireType 0 =*/80).uint32(message.count);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified MarkerItemLinkVo message, length delimited. Does not implicitly {@link kongying.MarkerItemLinkVo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof kongying.MarkerItemLinkVo
         * @static
         * @param {kongying.MarkerItemLinkVo.$Properties} message MarkerItemLinkVo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerItemLinkVo.encodeDelimited = function(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MarkerItemLinkVo message from the specified reader or buffer.
         * @function decode
         * @memberof kongying.MarkerItemLinkVo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {kongying.MarkerItemLinkVo & kongying.MarkerItemLinkVo.$Shape} MarkerItemLinkVo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerItemLinkVo.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.kongying.MarkerItemLinkVo(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                            message.itemId = value;
                        else
                            delete message.itemId;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                            message.iconId = value;
                        else
                            delete message.iconId;
                        continue;
                    }
                case 10: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.uint32())
                            message.count = value;
                        else
                            delete message.count;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a MarkerItemLinkVo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof kongying.MarkerItemLinkVo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {kongying.MarkerItemLinkVo & kongying.MarkerItemLinkVo.$Shape} MarkerItemLinkVo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerItemLinkVo.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MarkerItemLinkVo message.
         * @function verify
         * @memberof kongying.MarkerItemLinkVo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MarkerItemLinkVo.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.itemId != null && $Object.hasOwnProperty.call(message, "itemId"))
                if (!$util.isInteger(message.itemId) && !(message.itemId && $util.isInteger(message.itemId.low) && $util.isInteger(message.itemId.high)))
                    return "itemId: integer|Long expected";
            if (message.iconId != null && $Object.hasOwnProperty.call(message, "iconId"))
                if (!$util.isInteger(message.iconId) && !(message.iconId && $util.isInteger(message.iconId.low) && $util.isInteger(message.iconId.high)))
                    return "iconId: integer|Long expected";
            if (message.count != null && $Object.hasOwnProperty.call(message, "count"))
                if (!$util.isInteger(message.count))
                    return "count: integer expected";
            return null;
        };

        /**
         * Creates a MarkerItemLinkVo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof kongying.MarkerItemLinkVo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {kongying.MarkerItemLinkVo} MarkerItemLinkVo
         */
        MarkerItemLinkVo.fromObject = function (object, _depth) {
            if (object instanceof $root.kongying.MarkerItemLinkVo)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".kongying.MarkerItemLinkVo: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.kongying.MarkerItemLinkVo();
            if (object.itemId != null)
                if (typeof object.itemId === "object" ? object.itemId.low || object.itemId.high : $Number(object.itemId) !== 0)
                    if ($util.Long)
                        message.itemId = $util.Long.fromValue(object.itemId, true);
                    else if (typeof object.itemId === "string")
                        message.itemId = $parseInt(object.itemId, 10);
                    else if (typeof object.itemId === "number")
                        message.itemId = object.itemId;
                    else if (typeof object.itemId === "object")
                        message.itemId = new $util.LongBits(object.itemId.low >>> 0, object.itemId.high >>> 0).toNumber(true);
            if (object.iconId != null)
                if (typeof object.iconId === "object" ? object.iconId.low || object.iconId.high : $Number(object.iconId) !== 0)
                    if ($util.Long)
                        message.iconId = $util.Long.fromValue(object.iconId, true);
                    else if (typeof object.iconId === "string")
                        message.iconId = $parseInt(object.iconId, 10);
                    else if (typeof object.iconId === "number")
                        message.iconId = object.iconId;
                    else if (typeof object.iconId === "object")
                        message.iconId = new $util.LongBits(object.iconId.low >>> 0, object.iconId.high >>> 0).toNumber(true);
            if (object.count != null)
                if ($Number(object.count) !== 0)
                    message.count = object.count >>> 0;
            return message;
        };

        /**
         * Creates a plain object from a MarkerItemLinkVo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof kongying.MarkerItemLinkVo
         * @static
         * @param {kongying.MarkerItemLinkVo} message MarkerItemLinkVo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MarkerItemLinkVo.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.itemId = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.itemId = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.iconId = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.iconId = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                object.count = 0;
            }
            if (message.itemId != null && $Object.hasOwnProperty.call(message, "itemId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.itemId = typeof message.itemId === "number" ? $BigInt(message.itemId) : $util.Long.fromBits(message.itemId.low >>> 0, message.itemId.high >>> 0, true).toBigInt();
                else if (typeof message.itemId === "number")
                    object.itemId = options.longs === $String ? $String(message.itemId) : message.itemId;
                else
                    object.itemId = options.longs === $String ? $util.Long.prototype.toString.call(message.itemId) : options.longs === $Number ? new $util.LongBits(message.itemId.low >>> 0, message.itemId.high >>> 0).toNumber(true) : message.itemId;
            if (message.iconId != null && $Object.hasOwnProperty.call(message, "iconId"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.iconId = typeof message.iconId === "number" ? $BigInt(message.iconId) : $util.Long.fromBits(message.iconId.low >>> 0, message.iconId.high >>> 0, true).toBigInt();
                else if (typeof message.iconId === "number")
                    object.iconId = options.longs === $String ? $String(message.iconId) : message.iconId;
                else
                    object.iconId = options.longs === $String ? $util.Long.prototype.toString.call(message.iconId) : options.longs === $Number ? new $util.LongBits(message.iconId.low >>> 0, message.iconId.high >>> 0).toNumber(true) : message.iconId;
            if (message.count != null && $Object.hasOwnProperty.call(message, "count"))
                object.count = message.count;
            return object;
        };

        /**
         * Converts this MarkerItemLinkVo to JSON.
         * @function toJSON
         * @memberof kongying.MarkerItemLinkVo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MarkerItemLinkVo.prototype.toJSON = function() {
            return MarkerItemLinkVo.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for MarkerItemLinkVo
         * @function getTypeUrl
         * @memberof kongying.MarkerItemLinkVo
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        MarkerItemLinkVo.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/kongying.MarkerItemLinkVo";
        };

        return MarkerItemLinkVo;
    })();

    kongying.MarkerExtra = (function() {

        /**
         * Properties of a MarkerExtra.
         * @typedef {Object} kongying.MarkerExtra.$Properties
         * @property {kongying.MarkerExtraUnderground.$Properties|null} [underground] MarkerExtra underground
         * @property {kongying.MarkerExtraIconOverride.$Properties|null} [iconOverride] MarkerExtra iconOverride
         * @property {Array.<string>|null} [v_1_6Island] MarkerExtra v_1_6Island
         * @property {kongying.MarkerExtra28Island.$Properties|null} [v_2_8Island] MarkerExtra v_2_8Island
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a MarkerExtra.
         * @memberof kongying
         * @interface IMarkerExtra
         * @augments kongying.MarkerExtra.$Properties
         * @deprecated Use kongying.MarkerExtra.$Properties instead.
         */

        /**
         * Shape of a MarkerExtra.
         * @typedef {kongying.MarkerExtra.$Properties} kongying.MarkerExtra.$Shape
         */

        /**
         * Constructs a new MarkerExtra.
         * @memberof kongying
         * @classdesc Represents a MarkerExtra.
         * @constructor
         * @param {kongying.MarkerExtra.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const MarkerExtra = function (properties) {
            this.v_1_6Island = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * MarkerExtra underground.
         * @member {kongying.MarkerExtraUnderground.$Properties|null|undefined} underground
         * @memberof kongying.MarkerExtra
         * @instance
         */
        MarkerExtra.prototype.underground = null;

        /**
         * MarkerExtra iconOverride.
         * @member {kongying.MarkerExtraIconOverride.$Properties|null|undefined} iconOverride
         * @memberof kongying.MarkerExtra
         * @instance
         */
        MarkerExtra.prototype.iconOverride = null;

        /**
         * MarkerExtra v_1_6Island.
         * @member {Array.<string>} v_1_6Island
         * @memberof kongying.MarkerExtra
         * @instance
         */
        MarkerExtra.prototype.v_1_6Island = $util.emptyArray;

        /**
         * MarkerExtra v_2_8Island.
         * @member {kongying.MarkerExtra28Island.$Properties|null|undefined} v_2_8Island
         * @memberof kongying.MarkerExtra
         * @instance
         */
        MarkerExtra.prototype.v_2_8Island = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MarkerExtra.prototype, "_underground", {
            get: $util.oneOfGetter($oneOfFields = ["underground"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MarkerExtra.prototype, "_iconOverride", {
            get: $util.oneOfGetter($oneOfFields = ["iconOverride"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MarkerExtra.prototype, "_v_2_8Island", {
            get: $util.oneOfGetter($oneOfFields = ["v_2_8Island"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new MarkerExtra instance using the specified properties.
         * @function create
         * @memberof kongying.MarkerExtra
         * @static
         * @param {kongying.MarkerExtra.$Properties=} [properties] Properties to set
         * @returns {kongying.MarkerExtra} MarkerExtra instance
         * @type {{
         *   (properties: kongying.MarkerExtra.$Shape): kongying.MarkerExtra & kongying.MarkerExtra.$Shape;
         *   (properties?: kongying.MarkerExtra.$Properties): kongying.MarkerExtra;
         * }}
         */
        MarkerExtra.create = function(properties) {
            return new MarkerExtra(properties);
        };

        /**
         * Encodes the specified MarkerExtra message. Does not implicitly {@link kongying.MarkerExtra.verify|verify} messages.
         * @function encode
         * @memberof kongying.MarkerExtra
         * @static
         * @param {kongying.MarkerExtra.$Properties} message MarkerExtra message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerExtra.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.underground != null && $Object.hasOwnProperty.call(message, "underground"))
                $root.kongying.MarkerExtraUnderground.encode(message.underground, writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
            if (message.iconOverride != null && $Object.hasOwnProperty.call(message, "iconOverride"))
                $root.kongying.MarkerExtraIconOverride.encode(message.iconOverride, writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim();
            if (message.v_1_6Island != null && message.v_1_6Island.length)
                for (let i = 0; i < message.v_1_6Island.length; ++i)
                    writer.uint32(/* id 100, wireType 2 =*/802).string(message.v_1_6Island[i]);
            if (message.v_2_8Island != null && $Object.hasOwnProperty.call(message, "v_2_8Island"))
                $root.kongying.MarkerExtra28Island.encode(message.v_2_8Island, writer.uint32(/* id 101, wireType 2 =*/810).fork(), _depth + 1).ldelim();
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified MarkerExtra message, length delimited. Does not implicitly {@link kongying.MarkerExtra.verify|verify} messages.
         * @function encodeDelimited
         * @memberof kongying.MarkerExtra
         * @static
         * @param {kongying.MarkerExtra.$Properties} message MarkerExtra message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerExtra.encodeDelimited = function(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MarkerExtra message from the specified reader or buffer.
         * @function decode
         * @memberof kongying.MarkerExtra
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {kongying.MarkerExtra & kongying.MarkerExtra.$Shape} MarkerExtra
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerExtra.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.kongying.MarkerExtra();
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        message.underground = $root.kongying.MarkerExtraUnderground.decode(reader, reader.uint32(), $undefined, _depth + 1, message.underground);
                        message._underground = "underground";
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        message.iconOverride = $root.kongying.MarkerExtraIconOverride.decode(reader, reader.uint32(), $undefined, _depth + 1, message.iconOverride);
                        message._iconOverride = "iconOverride";
                        continue;
                    }
                case 100: {
                        if (wireType !== 2)
                            break;
                        if (!(message.v_1_6Island && message.v_1_6Island.length))
                            message.v_1_6Island = [];
                        message.v_1_6Island.push(reader.stringVerify());
                        continue;
                    }
                case 101: {
                        if (wireType !== 2)
                            break;
                        message.v_2_8Island = $root.kongying.MarkerExtra28Island.decode(reader, reader.uint32(), $undefined, _depth + 1, message.v_2_8Island);
                        message._v_2_8Island = "v_2_8Island";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a MarkerExtra message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof kongying.MarkerExtra
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {kongying.MarkerExtra & kongying.MarkerExtra.$Shape} MarkerExtra
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerExtra.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MarkerExtra message.
         * @function verify
         * @memberof kongying.MarkerExtra
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MarkerExtra.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.underground != null && $Object.hasOwnProperty.call(message, "underground")) {
                properties._underground = 1;
                {
                    let error = $root.kongying.MarkerExtraUnderground.verify(message.underground, _depth + 1);
                    if (error)
                        return "underground." + error;
                }
            }
            if (message.iconOverride != null && $Object.hasOwnProperty.call(message, "iconOverride")) {
                properties._iconOverride = 1;
                {
                    let error = $root.kongying.MarkerExtraIconOverride.verify(message.iconOverride, _depth + 1);
                    if (error)
                        return "iconOverride." + error;
                }
            }
            if (message.v_1_6Island != null && $Object.hasOwnProperty.call(message, "v_1_6Island")) {
                if (!$Array.isArray(message.v_1_6Island))
                    return "v_1_6Island: array expected";
                for (let i = 0; i < message.v_1_6Island.length; ++i)
                    if (!$util.isString(message.v_1_6Island[i]))
                        return "v_1_6Island: string[] expected";
            }
            if (message.v_2_8Island != null && $Object.hasOwnProperty.call(message, "v_2_8Island")) {
                properties._v_2_8Island = 1;
                {
                    let error = $root.kongying.MarkerExtra28Island.verify(message.v_2_8Island, _depth + 1);
                    if (error)
                        return "v_2_8Island." + error;
                }
            }
            return null;
        };

        /**
         * Creates a MarkerExtra message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof kongying.MarkerExtra
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {kongying.MarkerExtra} MarkerExtra
         */
        MarkerExtra.fromObject = function (object, _depth) {
            if (object instanceof $root.kongying.MarkerExtra)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".kongying.MarkerExtra: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.kongying.MarkerExtra();
            if (object.underground != null) {
                if (!$util.isObject(object.underground))
                    throw $TypeError(".kongying.MarkerExtra.underground: object expected");
                message.underground = $root.kongying.MarkerExtraUnderground.fromObject(object.underground, _depth + 1);
            }
            if (object.iconOverride != null) {
                if (!$util.isObject(object.iconOverride))
                    throw $TypeError(".kongying.MarkerExtra.iconOverride: object expected");
                message.iconOverride = $root.kongying.MarkerExtraIconOverride.fromObject(object.iconOverride, _depth + 1);
            }
            if (object.v_1_6Island) {
                if (!$Array.isArray(object.v_1_6Island))
                    throw $TypeError(".kongying.MarkerExtra.v_1_6Island: array expected");
                message.v_1_6Island = $Array(object.v_1_6Island.length);
                for (let i = 0; i < object.v_1_6Island.length; ++i)
                    message.v_1_6Island[i] = $String(object.v_1_6Island[i]);
            }
            if (object.v_2_8Island != null) {
                if (!$util.isObject(object.v_2_8Island))
                    throw $TypeError(".kongying.MarkerExtra.v_2_8Island: object expected");
                message.v_2_8Island = $root.kongying.MarkerExtra28Island.fromObject(object.v_2_8Island, _depth + 1);
            }
            return message;
        };

        /**
         * Creates a plain object from a MarkerExtra message. Also converts values to other types if specified.
         * @function toObject
         * @memberof kongying.MarkerExtra
         * @static
         * @param {kongying.MarkerExtra} message MarkerExtra
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MarkerExtra.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.v_1_6Island = [];
            if (message.underground != null && $Object.hasOwnProperty.call(message, "underground"))
                object.underground = $root.kongying.MarkerExtraUnderground.toObject(message.underground, options, _depth + 1);
            if (message.iconOverride != null && $Object.hasOwnProperty.call(message, "iconOverride"))
                object.iconOverride = $root.kongying.MarkerExtraIconOverride.toObject(message.iconOverride, options, _depth + 1);
            if (message.v_1_6Island && message.v_1_6Island.length) {
                object.v_1_6Island = $Array(message.v_1_6Island.length);
                for (let j = 0; j < message.v_1_6Island.length; ++j)
                    object.v_1_6Island[j] = message.v_1_6Island[j];
            }
            if (message.v_2_8Island != null && $Object.hasOwnProperty.call(message, "v_2_8Island"))
                object.v_2_8Island = $root.kongying.MarkerExtra28Island.toObject(message.v_2_8Island, options, _depth + 1);
            return object;
        };

        /**
         * Converts this MarkerExtra to JSON.
         * @function toJSON
         * @memberof kongying.MarkerExtra
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MarkerExtra.prototype.toJSON = function() {
            return MarkerExtra.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for MarkerExtra
         * @function getTypeUrl
         * @memberof kongying.MarkerExtra
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        MarkerExtra.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/kongying.MarkerExtra";
        };

        return MarkerExtra;
    })();

    kongying.MarkerExtraUnderground = (function() {

        /**
         * Properties of a MarkerExtraUnderground.
         * @typedef {Object} kongying.MarkerExtraUnderground.$Properties
         * @property {boolean|null} [isUnderground] MarkerExtraUnderground isUnderground
         * @property {boolean|null} [isGlobal] MarkerExtraUnderground isGlobal
         * @property {Array.<string>|null} [regionLevels] MarkerExtraUnderground regionLevels
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a MarkerExtraUnderground.
         * @memberof kongying
         * @interface IMarkerExtraUnderground
         * @augments kongying.MarkerExtraUnderground.$Properties
         * @deprecated Use kongying.MarkerExtraUnderground.$Properties instead.
         */

        /**
         * Shape of a MarkerExtraUnderground.
         * @typedef {kongying.MarkerExtraUnderground.$Properties} kongying.MarkerExtraUnderground.$Shape
         */

        /**
         * Constructs a new MarkerExtraUnderground.
         * @memberof kongying
         * @classdesc Represents a MarkerExtraUnderground.
         * @constructor
         * @param {kongying.MarkerExtraUnderground.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const MarkerExtraUnderground = function (properties) {
            this.regionLevels = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * MarkerExtraUnderground isUnderground.
         * @member {boolean} isUnderground
         * @memberof kongying.MarkerExtraUnderground
         * @instance
         */
        MarkerExtraUnderground.prototype.isUnderground = false;

        /**
         * MarkerExtraUnderground isGlobal.
         * @member {boolean|null|undefined} isGlobal
         * @memberof kongying.MarkerExtraUnderground
         * @instance
         */
        MarkerExtraUnderground.prototype.isGlobal = null;

        /**
         * MarkerExtraUnderground regionLevels.
         * @member {Array.<string>} regionLevels
         * @memberof kongying.MarkerExtraUnderground
         * @instance
         */
        MarkerExtraUnderground.prototype.regionLevels = $util.emptyArray;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(MarkerExtraUnderground.prototype, "_isGlobal", {
            get: $util.oneOfGetter($oneOfFields = ["isGlobal"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new MarkerExtraUnderground instance using the specified properties.
         * @function create
         * @memberof kongying.MarkerExtraUnderground
         * @static
         * @param {kongying.MarkerExtraUnderground.$Properties=} [properties] Properties to set
         * @returns {kongying.MarkerExtraUnderground} MarkerExtraUnderground instance
         * @type {{
         *   (properties: kongying.MarkerExtraUnderground.$Shape): kongying.MarkerExtraUnderground & kongying.MarkerExtraUnderground.$Shape;
         *   (properties?: kongying.MarkerExtraUnderground.$Properties): kongying.MarkerExtraUnderground;
         * }}
         */
        MarkerExtraUnderground.create = function(properties) {
            return new MarkerExtraUnderground(properties);
        };

        /**
         * Encodes the specified MarkerExtraUnderground message. Does not implicitly {@link kongying.MarkerExtraUnderground.verify|verify} messages.
         * @function encode
         * @memberof kongying.MarkerExtraUnderground
         * @static
         * @param {kongying.MarkerExtraUnderground.$Properties} message MarkerExtraUnderground message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerExtraUnderground.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.isUnderground != null && $Object.hasOwnProperty.call(message, "isUnderground"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isUnderground);
            if (message.isGlobal != null && $Object.hasOwnProperty.call(message, "isGlobal"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isGlobal);
            if (message.regionLevels != null && message.regionLevels.length)
                for (let i = 0; i < message.regionLevels.length; ++i)
                    writer.uint32(/* id 9, wireType 2 =*/74).string(message.regionLevels[i]);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified MarkerExtraUnderground message, length delimited. Does not implicitly {@link kongying.MarkerExtraUnderground.verify|verify} messages.
         * @function encodeDelimited
         * @memberof kongying.MarkerExtraUnderground
         * @static
         * @param {kongying.MarkerExtraUnderground.$Properties} message MarkerExtraUnderground message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerExtraUnderground.encodeDelimited = function(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MarkerExtraUnderground message from the specified reader or buffer.
         * @function decode
         * @memberof kongying.MarkerExtraUnderground
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {kongying.MarkerExtraUnderground & kongying.MarkerExtraUnderground.$Shape} MarkerExtraUnderground
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerExtraUnderground.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.kongying.MarkerExtraUnderground(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (value = reader.bool())
                            message.isUnderground = value;
                        else
                            delete message.isUnderground;
                        continue;
                    }
                case 2: {
                        if (wireType !== 0)
                            break;
                        message.isGlobal = reader.bool();
                        message._isGlobal = "isGlobal";
                        continue;
                    }
                case 9: {
                        if (wireType !== 2)
                            break;
                        if (!(message.regionLevels && message.regionLevels.length))
                            message.regionLevels = [];
                        message.regionLevels.push(reader.stringVerify());
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a MarkerExtraUnderground message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof kongying.MarkerExtraUnderground
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {kongying.MarkerExtraUnderground & kongying.MarkerExtraUnderground.$Shape} MarkerExtraUnderground
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerExtraUnderground.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MarkerExtraUnderground message.
         * @function verify
         * @memberof kongying.MarkerExtraUnderground
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MarkerExtraUnderground.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.isUnderground != null && $Object.hasOwnProperty.call(message, "isUnderground"))
                if (typeof message.isUnderground !== "boolean")
                    return "isUnderground: boolean expected";
            if (message.isGlobal != null && $Object.hasOwnProperty.call(message, "isGlobal")) {
                properties._isGlobal = 1;
                if (typeof message.isGlobal !== "boolean")
                    return "isGlobal: boolean expected";
            }
            if (message.regionLevels != null && $Object.hasOwnProperty.call(message, "regionLevels")) {
                if (!$Array.isArray(message.regionLevels))
                    return "regionLevels: array expected";
                for (let i = 0; i < message.regionLevels.length; ++i)
                    if (!$util.isString(message.regionLevels[i]))
                        return "regionLevels: string[] expected";
            }
            return null;
        };

        /**
         * Creates a MarkerExtraUnderground message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof kongying.MarkerExtraUnderground
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {kongying.MarkerExtraUnderground} MarkerExtraUnderground
         */
        MarkerExtraUnderground.fromObject = function (object, _depth) {
            if (object instanceof $root.kongying.MarkerExtraUnderground)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".kongying.MarkerExtraUnderground: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.kongying.MarkerExtraUnderground();
            if (object.isUnderground != null)
                if (object.isUnderground)
                    message.isUnderground = $Boolean(object.isUnderground);
            if (object.isGlobal != null)
                message.isGlobal = $Boolean(object.isGlobal);
            if (object.regionLevels) {
                if (!$Array.isArray(object.regionLevels))
                    throw $TypeError(".kongying.MarkerExtraUnderground.regionLevels: array expected");
                message.regionLevels = $Array(object.regionLevels.length);
                for (let i = 0; i < object.regionLevels.length; ++i)
                    message.regionLevels[i] = $String(object.regionLevels[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a MarkerExtraUnderground message. Also converts values to other types if specified.
         * @function toObject
         * @memberof kongying.MarkerExtraUnderground
         * @static
         * @param {kongying.MarkerExtraUnderground} message MarkerExtraUnderground
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MarkerExtraUnderground.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.regionLevels = [];
            if (options.defaults)
                object.isUnderground = false;
            if (message.isUnderground != null && $Object.hasOwnProperty.call(message, "isUnderground"))
                object.isUnderground = message.isUnderground;
            if (message.isGlobal != null && $Object.hasOwnProperty.call(message, "isGlobal"))
                object.isGlobal = message.isGlobal;
            if (message.regionLevels && message.regionLevels.length) {
                object.regionLevels = $Array(message.regionLevels.length);
                for (let j = 0; j < message.regionLevels.length; ++j)
                    object.regionLevels[j] = message.regionLevels[j];
            }
            return object;
        };

        /**
         * Converts this MarkerExtraUnderground to JSON.
         * @function toJSON
         * @memberof kongying.MarkerExtraUnderground
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MarkerExtraUnderground.prototype.toJSON = function() {
            return MarkerExtraUnderground.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for MarkerExtraUnderground
         * @function getTypeUrl
         * @memberof kongying.MarkerExtraUnderground
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        MarkerExtraUnderground.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/kongying.MarkerExtraUnderground";
        };

        return MarkerExtraUnderground;
    })();

    kongying.MarkerExtraIconOverride = (function() {

        /**
         * Properties of a MarkerExtraIconOverride.
         * @typedef {Object} kongying.MarkerExtraIconOverride.$Properties
         * @property {number|Long|null} [id] MarkerExtraIconOverride id
         * @property {number|null} [minZoom] MarkerExtraIconOverride minZoom
         * @property {number|null} [maxZoom] MarkerExtraIconOverride maxZoom
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a MarkerExtraIconOverride.
         * @memberof kongying
         * @interface IMarkerExtraIconOverride
         * @augments kongying.MarkerExtraIconOverride.$Properties
         * @deprecated Use kongying.MarkerExtraIconOverride.$Properties instead.
         */

        /**
         * Shape of a MarkerExtraIconOverride.
         * @typedef {kongying.MarkerExtraIconOverride.$Properties} kongying.MarkerExtraIconOverride.$Shape
         */

        /**
         * Constructs a new MarkerExtraIconOverride.
         * @memberof kongying
         * @classdesc Represents a MarkerExtraIconOverride.
         * @constructor
         * @param {kongying.MarkerExtraIconOverride.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const MarkerExtraIconOverride = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * MarkerExtraIconOverride id.
         * @member {number|Long} id
         * @memberof kongying.MarkerExtraIconOverride
         * @instance
         */
        MarkerExtraIconOverride.prototype.id = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

        /**
         * MarkerExtraIconOverride minZoom.
         * @member {number} minZoom
         * @memberof kongying.MarkerExtraIconOverride
         * @instance
         */
        MarkerExtraIconOverride.prototype.minZoom = 0;

        /**
         * MarkerExtraIconOverride maxZoom.
         * @member {number} maxZoom
         * @memberof kongying.MarkerExtraIconOverride
         * @instance
         */
        MarkerExtraIconOverride.prototype.maxZoom = 0;

        /**
         * Creates a new MarkerExtraIconOverride instance using the specified properties.
         * @function create
         * @memberof kongying.MarkerExtraIconOverride
         * @static
         * @param {kongying.MarkerExtraIconOverride.$Properties=} [properties] Properties to set
         * @returns {kongying.MarkerExtraIconOverride} MarkerExtraIconOverride instance
         * @type {{
         *   (properties: kongying.MarkerExtraIconOverride.$Shape): kongying.MarkerExtraIconOverride & kongying.MarkerExtraIconOverride.$Shape;
         *   (properties?: kongying.MarkerExtraIconOverride.$Properties): kongying.MarkerExtraIconOverride;
         * }}
         */
        MarkerExtraIconOverride.create = function(properties) {
            return new MarkerExtraIconOverride(properties);
        };

        /**
         * Encodes the specified MarkerExtraIconOverride message. Does not implicitly {@link kongying.MarkerExtraIconOverride.verify|verify} messages.
         * @function encode
         * @memberof kongying.MarkerExtraIconOverride
         * @static
         * @param {kongying.MarkerExtraIconOverride.$Properties} message MarkerExtraIconOverride message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerExtraIconOverride.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.id);
            if (message.minZoom != null && $Object.hasOwnProperty.call(message, "minZoom"))
                writer.uint32(/* id 2, wireType 5 =*/21).float(message.minZoom);
            if (message.maxZoom != null && $Object.hasOwnProperty.call(message, "maxZoom"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.maxZoom);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified MarkerExtraIconOverride message, length delimited. Does not implicitly {@link kongying.MarkerExtraIconOverride.verify|verify} messages.
         * @function encodeDelimited
         * @memberof kongying.MarkerExtraIconOverride
         * @static
         * @param {kongying.MarkerExtraIconOverride.$Properties} message MarkerExtraIconOverride message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerExtraIconOverride.encodeDelimited = function(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MarkerExtraIconOverride message from the specified reader or buffer.
         * @function decode
         * @memberof kongying.MarkerExtraIconOverride
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {kongying.MarkerExtraIconOverride & kongying.MarkerExtraIconOverride.$Shape} MarkerExtraIconOverride
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerExtraIconOverride.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.kongying.MarkerExtraIconOverride(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 0)
                            break;
                        if (typeof (value = reader.uint64()) === "object" ? value.low || value.high : value !== 0)
                            message.id = value;
                        else
                            delete message.id;
                        continue;
                    }
                case 2: {
                        if (wireType !== 5)
                            break;
                        if ((value = reader.float()) !== 0)
                            message.minZoom = value;
                        else
                            delete message.minZoom;
                        continue;
                    }
                case 3: {
                        if (wireType !== 5)
                            break;
                        if ((value = reader.float()) !== 0)
                            message.maxZoom = value;
                        else
                            delete message.maxZoom;
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a MarkerExtraIconOverride message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof kongying.MarkerExtraIconOverride
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {kongying.MarkerExtraIconOverride & kongying.MarkerExtraIconOverride.$Shape} MarkerExtraIconOverride
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerExtraIconOverride.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MarkerExtraIconOverride message.
         * @function verify
         * @memberof kongying.MarkerExtraIconOverride
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MarkerExtraIconOverride.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.minZoom != null && $Object.hasOwnProperty.call(message, "minZoom"))
                if (typeof message.minZoom !== "number")
                    return "minZoom: number expected";
            if (message.maxZoom != null && $Object.hasOwnProperty.call(message, "maxZoom"))
                if (typeof message.maxZoom !== "number")
                    return "maxZoom: number expected";
            return null;
        };

        /**
         * Creates a MarkerExtraIconOverride message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof kongying.MarkerExtraIconOverride
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {kongying.MarkerExtraIconOverride} MarkerExtraIconOverride
         */
        MarkerExtraIconOverride.fromObject = function (object, _depth) {
            if (object instanceof $root.kongying.MarkerExtraIconOverride)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".kongying.MarkerExtraIconOverride: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.kongying.MarkerExtraIconOverride();
            if (object.id != null)
                if (typeof object.id === "object" ? object.id.low || object.id.high : $Number(object.id) !== 0)
                    if ($util.Long)
                        message.id = $util.Long.fromValue(object.id, true);
                    else if (typeof object.id === "string")
                        message.id = $parseInt(object.id, 10);
                    else if (typeof object.id === "number")
                        message.id = object.id;
                    else if (typeof object.id === "object")
                        message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber(true);
            if (object.minZoom != null)
                if ($Number(object.minZoom) !== 0)
                    message.minZoom = $Number(object.minZoom);
            if (object.maxZoom != null)
                if ($Number(object.maxZoom) !== 0)
                    message.maxZoom = $Number(object.maxZoom);
            return message;
        };

        /**
         * Creates a plain object from a MarkerExtraIconOverride message. Also converts values to other types if specified.
         * @function toObject
         * @memberof kongying.MarkerExtraIconOverride
         * @static
         * @param {kongying.MarkerExtraIconOverride} message MarkerExtraIconOverride
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MarkerExtraIconOverride.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                if ($util.Long) {
                    let long = new $util.Long(0, 0, true);
                    object.id = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                } else
                    object.id = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                object.minZoom = 0;
                object.maxZoom = 0;
            }
            if (message.id != null && $Object.hasOwnProperty.call(message, "id"))
                if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                    object.id = typeof message.id === "number" ? $BigInt(message.id) : $util.Long.fromBits(message.id.low >>> 0, message.id.high >>> 0, true).toBigInt();
                else if (typeof message.id === "number")
                    object.id = options.longs === $String ? $String(message.id) : message.id;
                else
                    object.id = options.longs === $String ? $util.Long.prototype.toString.call(message.id) : options.longs === $Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber(true) : message.id;
            if (message.minZoom != null && $Object.hasOwnProperty.call(message, "minZoom"))
                object.minZoom = options.json && !$isFinite(message.minZoom) ? $String(message.minZoom) : message.minZoom;
            if (message.maxZoom != null && $Object.hasOwnProperty.call(message, "maxZoom"))
                object.maxZoom = options.json && !$isFinite(message.maxZoom) ? $String(message.maxZoom) : message.maxZoom;
            return object;
        };

        /**
         * Converts this MarkerExtraIconOverride to JSON.
         * @function toJSON
         * @memberof kongying.MarkerExtraIconOverride
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MarkerExtraIconOverride.prototype.toJSON = function() {
            return MarkerExtraIconOverride.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for MarkerExtraIconOverride
         * @function getTypeUrl
         * @memberof kongying.MarkerExtraIconOverride
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        MarkerExtraIconOverride.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/kongying.MarkerExtraIconOverride";
        };

        return MarkerExtraIconOverride;
    })();

    kongying.MarkerExtra28Island = (function() {

        /**
         * Properties of a MarkerExtra28Island.
         * @typedef {Object} kongying.MarkerExtra28Island.$Properties
         * @property {string|null} [islandName] MarkerExtra28Island islandName
         * @property {Array.<string>|null} [islandState] MarkerExtra28Island islandState
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a MarkerExtra28Island.
         * @memberof kongying
         * @interface IMarkerExtra28Island
         * @augments kongying.MarkerExtra28Island.$Properties
         * @deprecated Use kongying.MarkerExtra28Island.$Properties instead.
         */

        /**
         * Shape of a MarkerExtra28Island.
         * @typedef {kongying.MarkerExtra28Island.$Properties} kongying.MarkerExtra28Island.$Shape
         */

        /**
         * Constructs a new MarkerExtra28Island.
         * @memberof kongying
         * @classdesc Represents a MarkerExtra28Island.
         * @constructor
         * @param {kongying.MarkerExtra28Island.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const MarkerExtra28Island = function (properties) {
            this.islandState = [];
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * MarkerExtra28Island islandName.
         * @member {string} islandName
         * @memberof kongying.MarkerExtra28Island
         * @instance
         */
        MarkerExtra28Island.prototype.islandName = "";

        /**
         * MarkerExtra28Island islandState.
         * @member {Array.<string>} islandState
         * @memberof kongying.MarkerExtra28Island
         * @instance
         */
        MarkerExtra28Island.prototype.islandState = $util.emptyArray;

        /**
         * Creates a new MarkerExtra28Island instance using the specified properties.
         * @function create
         * @memberof kongying.MarkerExtra28Island
         * @static
         * @param {kongying.MarkerExtra28Island.$Properties=} [properties] Properties to set
         * @returns {kongying.MarkerExtra28Island} MarkerExtra28Island instance
         * @type {{
         *   (properties: kongying.MarkerExtra28Island.$Shape): kongying.MarkerExtra28Island & kongying.MarkerExtra28Island.$Shape;
         *   (properties?: kongying.MarkerExtra28Island.$Properties): kongying.MarkerExtra28Island;
         * }}
         */
        MarkerExtra28Island.create = function(properties) {
            return new MarkerExtra28Island(properties);
        };

        /**
         * Encodes the specified MarkerExtra28Island message. Does not implicitly {@link kongying.MarkerExtra28Island.verify|verify} messages.
         * @function encode
         * @memberof kongying.MarkerExtra28Island
         * @static
         * @param {kongying.MarkerExtra28Island.$Properties} message MarkerExtra28Island message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerExtra28Island.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.islandName != null && $Object.hasOwnProperty.call(message, "islandName"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.islandName);
            if (message.islandState != null && message.islandState.length)
                for (let i = 0; i < message.islandState.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.islandState[i]);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified MarkerExtra28Island message, length delimited. Does not implicitly {@link kongying.MarkerExtra28Island.verify|verify} messages.
         * @function encodeDelimited
         * @memberof kongying.MarkerExtra28Island
         * @static
         * @param {kongying.MarkerExtra28Island.$Properties} message MarkerExtra28Island message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerExtra28Island.encodeDelimited = function(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MarkerExtra28Island message from the specified reader or buffer.
         * @function decode
         * @memberof kongying.MarkerExtra28Island
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {kongying.MarkerExtra28Island & kongying.MarkerExtra28Island.$Shape} MarkerExtra28Island
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerExtra28Island.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.kongying.MarkerExtra28Island(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.islandName = value;
                        else
                            delete message.islandName;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if (!(message.islandState && message.islandState.length))
                            message.islandState = [];
                        message.islandState.push(reader.stringVerify());
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a MarkerExtra28Island message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof kongying.MarkerExtra28Island
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {kongying.MarkerExtra28Island & kongying.MarkerExtra28Island.$Shape} MarkerExtra28Island
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerExtra28Island.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MarkerExtra28Island message.
         * @function verify
         * @memberof kongying.MarkerExtra28Island
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MarkerExtra28Island.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.islandName != null && $Object.hasOwnProperty.call(message, "islandName"))
                if (!$util.isString(message.islandName))
                    return "islandName: string expected";
            if (message.islandState != null && $Object.hasOwnProperty.call(message, "islandState")) {
                if (!$Array.isArray(message.islandState))
                    return "islandState: array expected";
                for (let i = 0; i < message.islandState.length; ++i)
                    if (!$util.isString(message.islandState[i]))
                        return "islandState: string[] expected";
            }
            return null;
        };

        /**
         * Creates a MarkerExtra28Island message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof kongying.MarkerExtra28Island
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {kongying.MarkerExtra28Island} MarkerExtra28Island
         */
        MarkerExtra28Island.fromObject = function (object, _depth) {
            if (object instanceof $root.kongying.MarkerExtra28Island)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".kongying.MarkerExtra28Island: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.kongying.MarkerExtra28Island();
            if (object.islandName != null)
                if (typeof object.islandName !== "string" || object.islandName.length)
                    message.islandName = $String(object.islandName);
            if (object.islandState) {
                if (!$Array.isArray(object.islandState))
                    throw $TypeError(".kongying.MarkerExtra28Island.islandState: array expected");
                message.islandState = $Array(object.islandState.length);
                for (let i = 0; i < object.islandState.length; ++i)
                    message.islandState[i] = $String(object.islandState[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a MarkerExtra28Island message. Also converts values to other types if specified.
         * @function toObject
         * @memberof kongying.MarkerExtra28Island
         * @static
         * @param {kongying.MarkerExtra28Island} message MarkerExtra28Island
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MarkerExtra28Island.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.islandState = [];
            if (options.defaults)
                object.islandName = "";
            if (message.islandName != null && $Object.hasOwnProperty.call(message, "islandName"))
                object.islandName = message.islandName;
            if (message.islandState && message.islandState.length) {
                object.islandState = $Array(message.islandState.length);
                for (let j = 0; j < message.islandState.length; ++j)
                    object.islandState[j] = message.islandState[j];
            }
            return object;
        };

        /**
         * Converts this MarkerExtra28Island to JSON.
         * @function toJSON
         * @memberof kongying.MarkerExtra28Island
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MarkerExtra28Island.prototype.toJSON = function() {
            return MarkerExtra28Island.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for MarkerExtra28Island
         * @function getTypeUrl
         * @memberof kongying.MarkerExtra28Island
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        MarkerExtra28Island.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/kongying.MarkerExtra28Island";
        };

        return MarkerExtra28Island;
    })();

    kongying.MarkerVoList = (function() {

        /**
         * Properties of a MarkerVoList.
         * @typedef {Object} kongying.MarkerVoList.$Properties
         * @property {Array.<kongying.MarkerVo.$Properties>|null} [markers] MarkerVoList markers
         * @property {Object.<string,kongying.SysUserSmallVo.$Properties>|null} [users] MarkerVoList users
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a MarkerVoList.
         * @memberof kongying
         * @interface IMarkerVoList
         * @augments kongying.MarkerVoList.$Properties
         * @deprecated Use kongying.MarkerVoList.$Properties instead.
         */

        /**
         * Shape of a MarkerVoList.
         * @typedef {kongying.MarkerVoList.$Properties} kongying.MarkerVoList.$Shape
         */

        /**
         * Constructs a new MarkerVoList.
         * @memberof kongying
         * @classdesc Represents a MarkerVoList.
         * @constructor
         * @param {kongying.MarkerVoList.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const MarkerVoList = function (properties) {
            this.markers = [];
            this.users = {};
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * MarkerVoList markers.
         * @member {Array.<kongying.MarkerVo.$Properties>} markers
         * @memberof kongying.MarkerVoList
         * @instance
         */
        MarkerVoList.prototype.markers = $util.emptyArray;

        /**
         * MarkerVoList users.
         * @member {Object.<string,kongying.SysUserSmallVo.$Properties>} users
         * @memberof kongying.MarkerVoList
         * @instance
         */
        MarkerVoList.prototype.users = $util.emptyObject;

        /**
         * Creates a new MarkerVoList instance using the specified properties.
         * @function create
         * @memberof kongying.MarkerVoList
         * @static
         * @param {kongying.MarkerVoList.$Properties=} [properties] Properties to set
         * @returns {kongying.MarkerVoList} MarkerVoList instance
         * @type {{
         *   (properties: kongying.MarkerVoList.$Shape): kongying.MarkerVoList & kongying.MarkerVoList.$Shape;
         *   (properties?: kongying.MarkerVoList.$Properties): kongying.MarkerVoList;
         * }}
         */
        MarkerVoList.create = function(properties) {
            return new MarkerVoList(properties);
        };

        /**
         * Encodes the specified MarkerVoList message. Does not implicitly {@link kongying.MarkerVoList.verify|verify} messages.
         * @function encode
         * @memberof kongying.MarkerVoList
         * @static
         * @param {kongying.MarkerVoList.$Properties} message MarkerVoList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerVoList.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.markers != null && message.markers.length)
                for (let i = 0; i < message.markers.length; ++i)
                    $root.kongying.MarkerVo.encode(message.markers[i], writer.uint32(/* id 1, wireType 2 =*/10).fork(), _depth + 1).ldelim();
            if (message.users != null && $Object.hasOwnProperty.call(message, "users"))
                for (let keys = $Object.keys(message.users), i = 0; i < keys.length; ++i) {
                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 0 =*/8).uint64($util.longFromKey(keys[i], true));
                    $root.kongying.SysUserSmallVo.encode(message.users[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork(), _depth + 1).ldelim().ldelim();
                }
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified MarkerVoList message, length delimited. Does not implicitly {@link kongying.MarkerVoList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof kongying.MarkerVoList
         * @static
         * @param {kongying.MarkerVoList.$Properties} message MarkerVoList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MarkerVoList.encodeDelimited = function(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a MarkerVoList message from the specified reader or buffer.
         * @function decode
         * @memberof kongying.MarkerVoList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {kongying.MarkerVoList & kongying.MarkerVoList.$Shape} MarkerVoList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerVoList.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.kongying.MarkerVoList(), key, value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if (!(message.markers && message.markers.length))
                            message.markers = [];
                        message.markers.push($root.kongying.MarkerVo.decode(reader, reader.uint32(), $undefined, _depth + 1));
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if (message.users === $util.emptyObject)
                            message.users = {};
                        let end2 = reader.uint32() + reader.pos;
                        key = 0;
                        value = null;
                        while (reader.pos < end2) {
                            let tag2 = reader.tag();
                            wireType = tag2 & 7;
                            switch (tag2 >>>= 3) {
                            case 1:
                                if (wireType !== 0)
                                    break;
                                key = reader.uint64();
                                continue;
                            case 2:
                                if (wireType !== 2)
                                    break;
                                value = $root.kongying.SysUserSmallVo.decode(reader, reader.uint32(), $undefined, _depth + 1);
                                continue;
                            }
                            reader.skipType(wireType, _depth, tag2);
                        }
                        message.users[typeof key === "object" ? $util.longToHash(key) : key] = value || new $root.kongying.SysUserSmallVo();
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a MarkerVoList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof kongying.MarkerVoList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {kongying.MarkerVoList & kongying.MarkerVoList.$Shape} MarkerVoList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MarkerVoList.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MarkerVoList message.
         * @function verify
         * @memberof kongying.MarkerVoList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MarkerVoList.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            if (message.markers != null && $Object.hasOwnProperty.call(message, "markers")) {
                if (!$Array.isArray(message.markers))
                    return "markers: array expected";
                for (let i = 0; i < message.markers.length; ++i) {
                    let error = $root.kongying.MarkerVo.verify(message.markers[i], _depth + 1);
                    if (error)
                        return "markers." + error;
                }
            }
            if (message.users != null && $Object.hasOwnProperty.call(message, "users")) {
                if (!$util.isObject(message.users))
                    return "users: object expected";
                let key = $Object.keys(message.users);
                for (let i = 0; i < key.length; ++i) {
                    if (!$util.key64Re.test(key[i]))
                        return "users: integer|Long key{k:uint64} expected";
                    {
                        let error = $root.kongying.SysUserSmallVo.verify(message.users[key[i]], _depth + 1);
                        if (error)
                            return "users." + error;
                    }
                }
            }
            return null;
        };

        /**
         * Creates a MarkerVoList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof kongying.MarkerVoList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {kongying.MarkerVoList} MarkerVoList
         */
        MarkerVoList.fromObject = function (object, _depth) {
            if (object instanceof $root.kongying.MarkerVoList)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".kongying.MarkerVoList: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.kongying.MarkerVoList();
            if (object.markers) {
                if (!$Array.isArray(object.markers))
                    throw $TypeError(".kongying.MarkerVoList.markers: array expected");
                message.markers = $Array(object.markers.length);
                for (let i = 0; i < object.markers.length; ++i) {
                    if (!$util.isObject(object.markers[i]))
                        throw $TypeError(".kongying.MarkerVoList.markers: object expected");
                    message.markers[i] = $root.kongying.MarkerVo.fromObject(object.markers[i], _depth + 1);
                }
            }
            if (object.users) {
                if (!$util.isObject(object.users))
                    throw $TypeError(".kongying.MarkerVoList.users: object expected");
                message.users = {};
                for (let keys = $Object.keys(object.users), i = 0; i < keys.length; ++i) {
                    if (keys[i] === "__proto__")
                        $util.makeProp(message.users, keys[i]);
                    if (!$util.isObject(object.users[keys[i]]))
                        throw $TypeError(".kongying.MarkerVoList.users: object expected");
                    message.users[keys[i]] = $root.kongying.SysUserSmallVo.fromObject(object.users[keys[i]], _depth + 1);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a MarkerVoList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof kongying.MarkerVoList
         * @static
         * @param {kongying.MarkerVoList} message MarkerVoList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MarkerVoList.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.arrays || options.defaults)
                object.markers = [];
            if (options.objects || options.defaults)
                object.users = {};
            if (message.markers && message.markers.length) {
                object.markers = $Array(message.markers.length);
                for (let j = 0; j < message.markers.length; ++j)
                    object.markers[j] = $root.kongying.MarkerVo.toObject(message.markers[j], options, _depth + 1);
            }
            let keys2;
            if (message.users && (keys2 = $Object.keys(message.users)).length) {
                object.users = {};
                for (let j = 0; j < keys2.length; ++j) {
                    let k2 = $util.longFromKey(keys2[j], true).toString();
                    if (keys2[j] === "__proto__")
                        $util.makeProp(object.users, keys2[j]);
                    object.users[k2] = $root.kongying.SysUserSmallVo.toObject(message.users[keys2[j]], options, _depth + 1);
                }
            }
            return object;
        };

        /**
         * Converts this MarkerVoList to JSON.
         * @function toJSON
         * @memberof kongying.MarkerVoList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MarkerVoList.prototype.toJSON = function() {
            return MarkerVoList.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for MarkerVoList
         * @function getTypeUrl
         * @memberof kongying.MarkerVoList
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        MarkerVoList.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/kongying.MarkerVoList";
        };

        return MarkerVoList;
    })();

    kongying.SysUserSmallVo = (function() {

        /**
         * Properties of a SysUserSmallVo.
         * @typedef {Object} kongying.SysUserSmallVo.$Properties
         * @property {string|null} [username] SysUserSmallVo username
         * @property {string|null} [nickname] SysUserSmallVo nickname
         * @property {string|null} [qq] SysUserSmallVo qq
         * @property {string|null} [phone] SysUserSmallVo phone
         * @property {string|null} [logo] SysUserSmallVo logo
         * @property {string|null} [remark] SysUserSmallVo remark
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */

        /**
         * Properties of a SysUserSmallVo.
         * @memberof kongying
         * @interface ISysUserSmallVo
         * @augments kongying.SysUserSmallVo.$Properties
         * @deprecated Use kongying.SysUserSmallVo.$Properties instead.
         */

        /**
         * Shape of a SysUserSmallVo.
         * @typedef {kongying.SysUserSmallVo.$Properties} kongying.SysUserSmallVo.$Shape
         */

        /**
         * Constructs a new SysUserSmallVo.
         * @memberof kongying
         * @classdesc Represents a SysUserSmallVo.
         * @constructor
         * @param {kongying.SysUserSmallVo.$Properties=} [properties] Properties to set
         * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
         */
        const SysUserSmallVo = function (properties) {
            if (properties)
                for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null && keys[i] !== "__proto__")
                        this[keys[i]] = properties[keys[i]];
        };

        /**
         * SysUserSmallVo username.
         * @member {string} username
         * @memberof kongying.SysUserSmallVo
         * @instance
         */
        SysUserSmallVo.prototype.username = "";

        /**
         * SysUserSmallVo nickname.
         * @member {string} nickname
         * @memberof kongying.SysUserSmallVo
         * @instance
         */
        SysUserSmallVo.prototype.nickname = "";

        /**
         * SysUserSmallVo qq.
         * @member {string} qq
         * @memberof kongying.SysUserSmallVo
         * @instance
         */
        SysUserSmallVo.prototype.qq = "";

        /**
         * SysUserSmallVo phone.
         * @member {string|null|undefined} phone
         * @memberof kongying.SysUserSmallVo
         * @instance
         */
        SysUserSmallVo.prototype.phone = null;

        /**
         * SysUserSmallVo logo.
         * @member {string|null|undefined} logo
         * @memberof kongying.SysUserSmallVo
         * @instance
         */
        SysUserSmallVo.prototype.logo = null;

        /**
         * SysUserSmallVo remark.
         * @member {string|null|undefined} remark
         * @memberof kongying.SysUserSmallVo
         * @instance
         */
        SysUserSmallVo.prototype.remark = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(SysUserSmallVo.prototype, "_phone", {
            get: $util.oneOfGetter($oneOfFields = ["phone"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(SysUserSmallVo.prototype, "_logo", {
            get: $util.oneOfGetter($oneOfFields = ["logo"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        // Virtual OneOf for proto3 optional field
        $Object.defineProperty(SysUserSmallVo.prototype, "_remark", {
            get: $util.oneOfGetter($oneOfFields = ["remark"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new SysUserSmallVo instance using the specified properties.
         * @function create
         * @memberof kongying.SysUserSmallVo
         * @static
         * @param {kongying.SysUserSmallVo.$Properties=} [properties] Properties to set
         * @returns {kongying.SysUserSmallVo} SysUserSmallVo instance
         * @type {{
         *   (properties: kongying.SysUserSmallVo.$Shape): kongying.SysUserSmallVo & kongying.SysUserSmallVo.$Shape;
         *   (properties?: kongying.SysUserSmallVo.$Properties): kongying.SysUserSmallVo;
         * }}
         */
        SysUserSmallVo.create = function(properties) {
            return new SysUserSmallVo(properties);
        };

        /**
         * Encodes the specified SysUserSmallVo message. Does not implicitly {@link kongying.SysUserSmallVo.verify|verify} messages.
         * @function encode
         * @memberof kongying.SysUserSmallVo
         * @static
         * @param {kongying.SysUserSmallVo.$Properties} message SysUserSmallVo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SysUserSmallVo.encode = function (message, writer, _depth) {
            if (!writer)
                writer = $Writer.create();
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            if (message.username != null && $Object.hasOwnProperty.call(message, "username"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.username);
            if (message.nickname != null && $Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickname);
            if (message.qq != null && $Object.hasOwnProperty.call(message, "qq"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.qq);
            if (message.phone != null && $Object.hasOwnProperty.call(message, "phone"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.phone);
            if (message.logo != null && $Object.hasOwnProperty.call(message, "logo"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.logo);
            if (message.remark != null && $Object.hasOwnProperty.call(message, "remark"))
                writer.uint32(/* id 15, wireType 2 =*/122).string(message.remark);
            if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                for (let i = 0; i < message.$unknowns.length; ++i)
                    writer.raw(message.$unknowns[i]);
            return writer;
        };

        /**
         * Encodes the specified SysUserSmallVo message, length delimited. Does not implicitly {@link kongying.SysUserSmallVo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof kongying.SysUserSmallVo
         * @static
         * @param {kongying.SysUserSmallVo.$Properties} message SysUserSmallVo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SysUserSmallVo.encodeDelimited = function(message, writer) {
            return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
        };

        /**
         * Decodes a SysUserSmallVo message from the specified reader or buffer.
         * @function decode
         * @memberof kongying.SysUserSmallVo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {kongying.SysUserSmallVo & kongying.SysUserSmallVo.$Shape} SysUserSmallVo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SysUserSmallVo.decode = function (reader, length, _end, _depth, _target) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $Reader.recursionLimit)
                throw $Error("max depth exceeded");
            let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.kongying.SysUserSmallVo(), value;
            while (reader.pos < end) {
                let start = reader.pos;
                let tag = reader.tag();
                if (tag === _end) {
                    _end = $undefined;
                    break;
                }
                let wireType = tag & 7;
                switch (tag >>>= 3) {
                case 1: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.username = value;
                        else
                            delete message.username;
                        continue;
                    }
                case 2: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.nickname = value;
                        else
                            delete message.nickname;
                        continue;
                    }
                case 3: {
                        if (wireType !== 2)
                            break;
                        if ((value = reader.stringVerify()).length)
                            message.qq = value;
                        else
                            delete message.qq;
                        continue;
                    }
                case 4: {
                        if (wireType !== 2)
                            break;
                        message.phone = reader.stringVerify();
                        message._phone = "phone";
                        continue;
                    }
                case 5: {
                        if (wireType !== 2)
                            break;
                        message.logo = reader.stringVerify();
                        message._logo = "logo";
                        continue;
                    }
                case 15: {
                        if (wireType !== 2)
                            break;
                        message.remark = reader.stringVerify();
                        message._remark = "remark";
                        continue;
                    }
                }
                reader.skipType(wireType, _depth, tag);
                if (!reader.discardUnknown) {
                    $util.makeProp(message, "$unknowns", false);
                    (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                }
            }
            if (_end !== $undefined)
                throw $Error("missing end group");
            return message;
        };

        /**
         * Decodes a SysUserSmallVo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof kongying.SysUserSmallVo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {kongying.SysUserSmallVo & kongying.SysUserSmallVo.$Shape} SysUserSmallVo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SysUserSmallVo.decodeDelimited = function(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SysUserSmallVo message.
         * @function verify
         * @memberof kongying.SysUserSmallVo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SysUserSmallVo.verify = function (message, _depth) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                return "max depth exceeded";
            let properties = {};
            if (message.username != null && $Object.hasOwnProperty.call(message, "username"))
                if (!$util.isString(message.username))
                    return "username: string expected";
            if (message.nickname != null && $Object.hasOwnProperty.call(message, "nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.qq != null && $Object.hasOwnProperty.call(message, "qq"))
                if (!$util.isString(message.qq))
                    return "qq: string expected";
            if (message.phone != null && $Object.hasOwnProperty.call(message, "phone")) {
                properties._phone = 1;
                if (!$util.isString(message.phone))
                    return "phone: string expected";
            }
            if (message.logo != null && $Object.hasOwnProperty.call(message, "logo")) {
                properties._logo = 1;
                if (!$util.isString(message.logo))
                    return "logo: string expected";
            }
            if (message.remark != null && $Object.hasOwnProperty.call(message, "remark")) {
                properties._remark = 1;
                if (!$util.isString(message.remark))
                    return "remark: string expected";
            }
            return null;
        };

        /**
         * Creates a SysUserSmallVo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof kongying.SysUserSmallVo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {kongying.SysUserSmallVo} SysUserSmallVo
         */
        SysUserSmallVo.fromObject = function (object, _depth) {
            if (object instanceof $root.kongying.SysUserSmallVo)
                return object;
            if (!$util.isObject(object))
                throw $TypeError(".kongying.SysUserSmallVo: object expected");
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let message = new $root.kongying.SysUserSmallVo();
            if (object.username != null)
                if (typeof object.username !== "string" || object.username.length)
                    message.username = $String(object.username);
            if (object.nickname != null)
                if (typeof object.nickname !== "string" || object.nickname.length)
                    message.nickname = $String(object.nickname);
            if (object.qq != null)
                if (typeof object.qq !== "string" || object.qq.length)
                    message.qq = $String(object.qq);
            if (object.phone != null)
                message.phone = $String(object.phone);
            if (object.logo != null)
                message.logo = $String(object.logo);
            if (object.remark != null)
                message.remark = $String(object.remark);
            return message;
        };

        /**
         * Creates a plain object from a SysUserSmallVo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof kongying.SysUserSmallVo
         * @static
         * @param {kongying.SysUserSmallVo} message SysUserSmallVo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SysUserSmallVo.toObject = function (message, options, _depth) {
            if (!options)
                options = {};
            if (_depth === $undefined)
                _depth = 0;
            if (_depth > $util.recursionLimit)
                throw $Error("max depth exceeded");
            let object = {};
            if (options.defaults) {
                object.username = "";
                object.nickname = "";
                object.qq = "";
            }
            if (message.username != null && $Object.hasOwnProperty.call(message, "username"))
                object.username = message.username;
            if (message.nickname != null && $Object.hasOwnProperty.call(message, "nickname"))
                object.nickname = message.nickname;
            if (message.qq != null && $Object.hasOwnProperty.call(message, "qq"))
                object.qq = message.qq;
            if (message.phone != null && $Object.hasOwnProperty.call(message, "phone"))
                object.phone = message.phone;
            if (message.logo != null && $Object.hasOwnProperty.call(message, "logo"))
                object.logo = message.logo;
            if (message.remark != null && $Object.hasOwnProperty.call(message, "remark"))
                object.remark = message.remark;
            return object;
        };

        /**
         * Converts this SysUserSmallVo to JSON.
         * @function toJSON
         * @memberof kongying.SysUserSmallVo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SysUserSmallVo.prototype.toJSON = function() {
            return SysUserSmallVo.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the type url for SysUserSmallVo
         * @function getTypeUrl
         * @memberof kongying.SysUserSmallVo
         * @static
         * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns {string} The type url
         */
        SysUserSmallVo.getTypeUrl = function(prefix) {
            if (prefix === $undefined)
                prefix = "type.googleapis.com";
            return prefix + "/kongying.SysUserSmallVo";
        };

        return SysUserSmallVo;
    })();

    return kongying;
})();

export const google = $root.google = (() => {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    const google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        const protobuf = {};

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @typedef {Object} google.protobuf.Timestamp.$Properties
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @augments google.protobuf.Timestamp.$Properties
             * @deprecated Use google.protobuf.Timestamp.$Properties instead.
             */

            /**
             * Shape of a Timestamp.
             * @typedef {google.protobuf.Timestamp.$Properties} google.protobuf.Timestamp.$Shape
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @constructor
             * @param {google.protobuf.Timestamp.$Properties=} [properties] Properties to set
             * @property {Array.<Uint8Array>} [$unknowns] Unknown fields preserved while decoding when enabled
             */
            const Timestamp = function (properties) {
                if (properties)
                    for (let keys = $Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null && keys[i] !== "__proto__")
                            this[keys[i]] = properties[keys[i]];
            };

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp.$Properties=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             * @type {{
             *   (properties: google.protobuf.Timestamp.$Shape): google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape;
             *   (properties?: google.protobuf.Timestamp.$Properties): google.protobuf.Timestamp;
             * }}
             */
            Timestamp.create = function(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp.$Properties} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function (message, writer, _depth) {
                if (!writer)
                    writer = $Writer.create();
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                if (message.seconds != null && $Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && $Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                if (message.$unknowns != null && $Object.hasOwnProperty.call(message, "$unknowns"))
                    for (let i = 0; i < message.$unknowns.length; ++i)
                        writer.raw(message.$unknowns[i]);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp.$Properties} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function(message, writer) {
                return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function (reader, length, _end, _depth, _target) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $Reader.recursionLimit)
                    throw $Error("max depth exceeded");
                let end = length === $undefined ? reader.len : reader.pos + length, message = _target || new $root.google.protobuf.Timestamp(), value;
                while (reader.pos < end) {
                    let start = reader.pos;
                    let tag = reader.tag();
                    if (tag === _end) {
                        _end = $undefined;
                        break;
                    }
                    let wireType = tag & 7;
                    switch (tag >>>= 3) {
                    case 1: {
                            if (wireType !== 0)
                                break;
                            if (typeof (value = reader.int64()) === "object" ? value.low || value.high : value !== 0)
                                message.seconds = value;
                            else
                                delete message.seconds;
                            continue;
                        }
                    case 2: {
                            if (wireType !== 0)
                                break;
                            if (value = reader.int32())
                                message.nanos = value;
                            else
                                delete message.nanos;
                            continue;
                        }
                    }
                    reader.skipType(wireType, _depth, tag);
                    if (!reader.discardUnknown) {
                        $util.makeProp(message, "$unknowns", false);
                        (message.$unknowns || (message.$unknowns = [])).push(reader.raw(start, reader.pos));
                    }
                }
                if (_end !== $undefined)
                    throw $Error("missing end group");
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function (message, _depth) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    return "max depth exceeded";
                if (message.seconds != null && $Object.hasOwnProperty.call(message, "seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && $Object.hasOwnProperty.call(message, "nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function (object, _depth) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                if (!$util.isObject(object))
                    throw $TypeError(".google.protobuf.Timestamp: object expected");
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if (typeof object.seconds === "object" ? object.seconds.low || object.seconds.high : $Number(object.seconds) !== 0)
                        if ($util.Long)
                            message.seconds = $util.Long.fromValue(object.seconds, false);
                        else if (typeof object.seconds === "string")
                            message.seconds = $parseInt(object.seconds, 10);
                        else if (typeof object.seconds === "number")
                            message.seconds = object.seconds;
                        else if (typeof object.seconds === "object")
                            message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    if ($Number(object.nanos) !== 0)
                        message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function (message, options, _depth) {
                if (!options)
                    options = {};
                if (_depth === $undefined)
                    _depth = 0;
                if (_depth > $util.recursionLimit)
                    throw $Error("max depth exceeded");
                let object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        let long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === $String ? long.toString() : options.longs === $Number ? long.toNumber() : typeof $BigInt !== "undefined" && options.longs === $BigInt ? long.toBigInt() : long;
                    } else
                        object.seconds = options.longs === $String ? "0" : typeof $BigInt !== "undefined" && options.longs === $BigInt ? $BigInt("0") : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && $Object.hasOwnProperty.call(message, "seconds"))
                    if (typeof $BigInt !== "undefined" && options.longs === $BigInt)
                        object.seconds = typeof message.seconds === "number" ? $BigInt(message.seconds) : $util.Long.fromBits(message.seconds.low >>> 0, message.seconds.high >>> 0, false).toBigInt();
                    else if (typeof message.seconds === "number")
                        object.seconds = options.longs === $String ? $String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === $String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === $Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && $Object.hasOwnProperty.call(message, "nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function() {
                return Timestamp.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the type url for Timestamp
             * @function getTypeUrl
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {string} [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns {string} The type url
             */
            Timestamp.getTypeUrl = function(prefix) {
                if (prefix === $undefined)
                    prefix = "type.googleapis.com";
                return prefix + "/google.protobuf.Timestamp";
            };

            return Timestamp;
        })();

        return protobuf;
    })();

    return google;
})();

export {
  $root as default
};

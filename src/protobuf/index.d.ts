import * as $protobuf from "protobufjs";
import Long = require("long");

/** Namespace kongying. */
export namespace kongying {

    /**
     * Properties of a MarkerVo.
     * @deprecated Use kongying.MarkerVo.$Properties instead.
     */
    interface IMarkerVo extends kongying.MarkerVo.$Properties {
    }

    /** Represents a MarkerVo. */
    class MarkerVo {

        /**
         * Constructs a new MarkerVo.
         * @param [properties] Properties to set
         */
        constructor(properties?: kongying.MarkerVo.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** MarkerVo version. */
        version: (number|Long);

        /** MarkerVo id. */
        id: (number|Long);

        /** MarkerVo creatorId. */
        creatorId: (number|Long);

        /** MarkerVo createTime. */
        createTime?: (number|Long|null);

        /** MarkerVo updaterId. */
        updaterId: (number|Long);

        /** MarkerVo updateTime. */
        updateTime?: (number|Long|null);

        /** MarkerVo markerTitle. */
        markerTitle: string;

        /** MarkerVo position. */
        position: string;

        /** MarkerVo content. */
        content: string;

        /** MarkerVo picture. */
        picture: string;

        /** MarkerVo videoPath. */
        videoPath: string;

        /** MarkerVo refreshTime. */
        refreshTime: (number|Long);

        /** MarkerVo hiddenFlag. */
        hiddenFlag: number;

        /** MarkerVo itemList. */
        itemList: kongying.MarkerItemLinkVo.$Properties[];

        /** MarkerVo markerCreatorId. */
        markerCreatorId?: (number|Long|null);

        /** MarkerVo pictureCreatorId. */
        pictureCreatorId?: (number|Long|null);

        /** MarkerVo markerStamp. */
        markerStamp: string;

        /** MarkerVo extra. */
        extra?: (kongying.MarkerExtra.$Properties|null);

        /** MarkerVo linkageId. */
        linkageId: string;

        /**
         * Creates a new MarkerVo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MarkerVo instance
         */
        static create(properties: kongying.MarkerVo.$Shape): kongying.MarkerVo & kongying.MarkerVo.$Shape;
        static create(properties?: kongying.MarkerVo.$Properties): kongying.MarkerVo;

        /**
         * Encodes the specified MarkerVo message. Does not implicitly {@link kongying.MarkerVo.verify|verify} messages.
         * @param message MarkerVo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: kongying.MarkerVo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MarkerVo message, length delimited. Does not implicitly {@link kongying.MarkerVo.verify|verify} messages.
         * @param message MarkerVo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: kongying.MarkerVo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MarkerVo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {kongying.MarkerVo & kongying.MarkerVo.$Shape} MarkerVo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kongying.MarkerVo & kongying.MarkerVo.$Shape;

        /**
         * Decodes a MarkerVo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {kongying.MarkerVo & kongying.MarkerVo.$Shape} MarkerVo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kongying.MarkerVo & kongying.MarkerVo.$Shape;

        /**
         * Verifies a MarkerVo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MarkerVo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MarkerVo
         */
        static fromObject(object: { [k: string]: any }): kongying.MarkerVo;

        /**
         * Creates a plain object from a MarkerVo message. Also converts values to other types if specified.
         * @param message MarkerVo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: kongying.MarkerVo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MarkerVo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for MarkerVo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace MarkerVo {

        /** Properties of a MarkerVo. */
        interface $Properties {

            /** MarkerVo version */
            version?: (number|Long|null);

            /** MarkerVo id */
            id?: (number|Long|null);

            /** MarkerVo creatorId */
            creatorId?: (number|Long|null);

            /** MarkerVo createTime */
            createTime?: (number|Long|null);

            /** MarkerVo updaterId */
            updaterId?: (number|Long|null);

            /** MarkerVo updateTime */
            updateTime?: (number|Long|null);

            /** MarkerVo markerTitle */
            markerTitle?: (string|null);

            /** MarkerVo position */
            position?: (string|null);

            /** MarkerVo content */
            content?: (string|null);

            /** MarkerVo picture */
            picture?: (string|null);

            /** MarkerVo videoPath */
            videoPath?: (string|null);

            /** MarkerVo refreshTime */
            refreshTime?: (number|Long|null);

            /** MarkerVo hiddenFlag */
            hiddenFlag?: (number|null);

            /** MarkerVo itemList */
            itemList?: (kongying.MarkerItemLinkVo.$Properties[]|null);

            /** MarkerVo markerCreatorId */
            markerCreatorId?: (number|Long|null);

            /** MarkerVo pictureCreatorId */
            pictureCreatorId?: (number|Long|null);

            /** MarkerVo markerStamp */
            markerStamp?: (string|null);

            /** MarkerVo extra */
            extra?: (kongying.MarkerExtra.$Properties|null);

            /** MarkerVo linkageId */
            linkageId?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a MarkerVo. */
        type $Shape = kongying.MarkerVo.$Properties;
    }

    /**
     * Properties of a MarkerItemLinkVo.
     * @deprecated Use kongying.MarkerItemLinkVo.$Properties instead.
     */
    interface IMarkerItemLinkVo extends kongying.MarkerItemLinkVo.$Properties {
    }

    /** Represents a MarkerItemLinkVo. */
    class MarkerItemLinkVo {

        /**
         * Constructs a new MarkerItemLinkVo.
         * @param [properties] Properties to set
         */
        constructor(properties?: kongying.MarkerItemLinkVo.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** MarkerItemLinkVo itemId. */
        itemId: (number|Long);

        /** MarkerItemLinkVo iconId. */
        iconId: (number|Long);

        /** MarkerItemLinkVo count. */
        count: number;

        /**
         * Creates a new MarkerItemLinkVo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MarkerItemLinkVo instance
         */
        static create(properties: kongying.MarkerItemLinkVo.$Shape): kongying.MarkerItemLinkVo & kongying.MarkerItemLinkVo.$Shape;
        static create(properties?: kongying.MarkerItemLinkVo.$Properties): kongying.MarkerItemLinkVo;

        /**
         * Encodes the specified MarkerItemLinkVo message. Does not implicitly {@link kongying.MarkerItemLinkVo.verify|verify} messages.
         * @param message MarkerItemLinkVo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: kongying.MarkerItemLinkVo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MarkerItemLinkVo message, length delimited. Does not implicitly {@link kongying.MarkerItemLinkVo.verify|verify} messages.
         * @param message MarkerItemLinkVo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: kongying.MarkerItemLinkVo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MarkerItemLinkVo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {kongying.MarkerItemLinkVo & kongying.MarkerItemLinkVo.$Shape} MarkerItemLinkVo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kongying.MarkerItemLinkVo & kongying.MarkerItemLinkVo.$Shape;

        /**
         * Decodes a MarkerItemLinkVo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {kongying.MarkerItemLinkVo & kongying.MarkerItemLinkVo.$Shape} MarkerItemLinkVo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kongying.MarkerItemLinkVo & kongying.MarkerItemLinkVo.$Shape;

        /**
         * Verifies a MarkerItemLinkVo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MarkerItemLinkVo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MarkerItemLinkVo
         */
        static fromObject(object: { [k: string]: any }): kongying.MarkerItemLinkVo;

        /**
         * Creates a plain object from a MarkerItemLinkVo message. Also converts values to other types if specified.
         * @param message MarkerItemLinkVo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: kongying.MarkerItemLinkVo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MarkerItemLinkVo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for MarkerItemLinkVo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace MarkerItemLinkVo {

        /** Properties of a MarkerItemLinkVo. */
        interface $Properties {

            /** MarkerItemLinkVo itemId */
            itemId?: (number|Long|null);

            /** MarkerItemLinkVo iconId */
            iconId?: (number|Long|null);

            /** MarkerItemLinkVo count */
            count?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a MarkerItemLinkVo. */
        type $Shape = kongying.MarkerItemLinkVo.$Properties;
    }

    /**
     * Properties of a MarkerExtra.
     * @deprecated Use kongying.MarkerExtra.$Properties instead.
     */
    interface IMarkerExtra extends kongying.MarkerExtra.$Properties {
    }

    /** Represents a MarkerExtra. */
    class MarkerExtra {

        /**
         * Constructs a new MarkerExtra.
         * @param [properties] Properties to set
         */
        constructor(properties?: kongying.MarkerExtra.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** MarkerExtra underground. */
        underground?: (kongying.MarkerExtraUnderground.$Properties|null);

        /** MarkerExtra iconOverride. */
        iconOverride?: (kongying.MarkerExtraIconOverride.$Properties|null);

        /** MarkerExtra v_1_6Island. */
        v_1_6Island: string[];

        /** MarkerExtra v_2_8Island. */
        v_2_8Island?: (kongying.MarkerExtra28Island.$Properties|null);

        /**
         * Creates a new MarkerExtra instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MarkerExtra instance
         */
        static create(properties: kongying.MarkerExtra.$Shape): kongying.MarkerExtra & kongying.MarkerExtra.$Shape;
        static create(properties?: kongying.MarkerExtra.$Properties): kongying.MarkerExtra;

        /**
         * Encodes the specified MarkerExtra message. Does not implicitly {@link kongying.MarkerExtra.verify|verify} messages.
         * @param message MarkerExtra message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: kongying.MarkerExtra.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MarkerExtra message, length delimited. Does not implicitly {@link kongying.MarkerExtra.verify|verify} messages.
         * @param message MarkerExtra message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: kongying.MarkerExtra.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MarkerExtra message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {kongying.MarkerExtra & kongying.MarkerExtra.$Shape} MarkerExtra
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kongying.MarkerExtra & kongying.MarkerExtra.$Shape;

        /**
         * Decodes a MarkerExtra message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {kongying.MarkerExtra & kongying.MarkerExtra.$Shape} MarkerExtra
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kongying.MarkerExtra & kongying.MarkerExtra.$Shape;

        /**
         * Verifies a MarkerExtra message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MarkerExtra message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MarkerExtra
         */
        static fromObject(object: { [k: string]: any }): kongying.MarkerExtra;

        /**
         * Creates a plain object from a MarkerExtra message. Also converts values to other types if specified.
         * @param message MarkerExtra
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: kongying.MarkerExtra, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MarkerExtra to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for MarkerExtra
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace MarkerExtra {

        /** Properties of a MarkerExtra. */
        interface $Properties {

            /** MarkerExtra underground */
            underground?: (kongying.MarkerExtraUnderground.$Properties|null);

            /** MarkerExtra iconOverride */
            iconOverride?: (kongying.MarkerExtraIconOverride.$Properties|null);

            /** MarkerExtra v_1_6Island */
            v_1_6Island?: (string[]|null);

            /** MarkerExtra v_2_8Island */
            v_2_8Island?: (kongying.MarkerExtra28Island.$Properties|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a MarkerExtra. */
        type $Shape = kongying.MarkerExtra.$Properties;
    }

    /**
     * Properties of a MarkerExtraUnderground.
     * @deprecated Use kongying.MarkerExtraUnderground.$Properties instead.
     */
    interface IMarkerExtraUnderground extends kongying.MarkerExtraUnderground.$Properties {
    }

    /** Represents a MarkerExtraUnderground. */
    class MarkerExtraUnderground {

        /**
         * Constructs a new MarkerExtraUnderground.
         * @param [properties] Properties to set
         */
        constructor(properties?: kongying.MarkerExtraUnderground.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** MarkerExtraUnderground isUnderground. */
        isUnderground: boolean;

        /** MarkerExtraUnderground isGlobal. */
        isGlobal?: (boolean|null);

        /** MarkerExtraUnderground regionLevels. */
        regionLevels: string[];

        /**
         * Creates a new MarkerExtraUnderground instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MarkerExtraUnderground instance
         */
        static create(properties: kongying.MarkerExtraUnderground.$Shape): kongying.MarkerExtraUnderground & kongying.MarkerExtraUnderground.$Shape;
        static create(properties?: kongying.MarkerExtraUnderground.$Properties): kongying.MarkerExtraUnderground;

        /**
         * Encodes the specified MarkerExtraUnderground message. Does not implicitly {@link kongying.MarkerExtraUnderground.verify|verify} messages.
         * @param message MarkerExtraUnderground message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: kongying.MarkerExtraUnderground.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MarkerExtraUnderground message, length delimited. Does not implicitly {@link kongying.MarkerExtraUnderground.verify|verify} messages.
         * @param message MarkerExtraUnderground message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: kongying.MarkerExtraUnderground.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MarkerExtraUnderground message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {kongying.MarkerExtraUnderground & kongying.MarkerExtraUnderground.$Shape} MarkerExtraUnderground
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kongying.MarkerExtraUnderground & kongying.MarkerExtraUnderground.$Shape;

        /**
         * Decodes a MarkerExtraUnderground message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {kongying.MarkerExtraUnderground & kongying.MarkerExtraUnderground.$Shape} MarkerExtraUnderground
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kongying.MarkerExtraUnderground & kongying.MarkerExtraUnderground.$Shape;

        /**
         * Verifies a MarkerExtraUnderground message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MarkerExtraUnderground message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MarkerExtraUnderground
         */
        static fromObject(object: { [k: string]: any }): kongying.MarkerExtraUnderground;

        /**
         * Creates a plain object from a MarkerExtraUnderground message. Also converts values to other types if specified.
         * @param message MarkerExtraUnderground
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: kongying.MarkerExtraUnderground, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MarkerExtraUnderground to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for MarkerExtraUnderground
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace MarkerExtraUnderground {

        /** Properties of a MarkerExtraUnderground. */
        interface $Properties {

            /** MarkerExtraUnderground isUnderground */
            isUnderground?: (boolean|null);

            /** MarkerExtraUnderground isGlobal */
            isGlobal?: (boolean|null);

            /** MarkerExtraUnderground regionLevels */
            regionLevels?: (string[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a MarkerExtraUnderground. */
        type $Shape = kongying.MarkerExtraUnderground.$Properties;
    }

    /**
     * Properties of a MarkerExtraIconOverride.
     * @deprecated Use kongying.MarkerExtraIconOverride.$Properties instead.
     */
    interface IMarkerExtraIconOverride extends kongying.MarkerExtraIconOverride.$Properties {
    }

    /** Represents a MarkerExtraIconOverride. */
    class MarkerExtraIconOverride {

        /**
         * Constructs a new MarkerExtraIconOverride.
         * @param [properties] Properties to set
         */
        constructor(properties?: kongying.MarkerExtraIconOverride.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** MarkerExtraIconOverride id. */
        id: (number|Long);

        /** MarkerExtraIconOverride minZoom. */
        minZoom: number;

        /** MarkerExtraIconOverride maxZoom. */
        maxZoom: number;

        /**
         * Creates a new MarkerExtraIconOverride instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MarkerExtraIconOverride instance
         */
        static create(properties: kongying.MarkerExtraIconOverride.$Shape): kongying.MarkerExtraIconOverride & kongying.MarkerExtraIconOverride.$Shape;
        static create(properties?: kongying.MarkerExtraIconOverride.$Properties): kongying.MarkerExtraIconOverride;

        /**
         * Encodes the specified MarkerExtraIconOverride message. Does not implicitly {@link kongying.MarkerExtraIconOverride.verify|verify} messages.
         * @param message MarkerExtraIconOverride message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: kongying.MarkerExtraIconOverride.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MarkerExtraIconOverride message, length delimited. Does not implicitly {@link kongying.MarkerExtraIconOverride.verify|verify} messages.
         * @param message MarkerExtraIconOverride message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: kongying.MarkerExtraIconOverride.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MarkerExtraIconOverride message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {kongying.MarkerExtraIconOverride & kongying.MarkerExtraIconOverride.$Shape} MarkerExtraIconOverride
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kongying.MarkerExtraIconOverride & kongying.MarkerExtraIconOverride.$Shape;

        /**
         * Decodes a MarkerExtraIconOverride message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {kongying.MarkerExtraIconOverride & kongying.MarkerExtraIconOverride.$Shape} MarkerExtraIconOverride
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kongying.MarkerExtraIconOverride & kongying.MarkerExtraIconOverride.$Shape;

        /**
         * Verifies a MarkerExtraIconOverride message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MarkerExtraIconOverride message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MarkerExtraIconOverride
         */
        static fromObject(object: { [k: string]: any }): kongying.MarkerExtraIconOverride;

        /**
         * Creates a plain object from a MarkerExtraIconOverride message. Also converts values to other types if specified.
         * @param message MarkerExtraIconOverride
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: kongying.MarkerExtraIconOverride, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MarkerExtraIconOverride to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for MarkerExtraIconOverride
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace MarkerExtraIconOverride {

        /** Properties of a MarkerExtraIconOverride. */
        interface $Properties {

            /** MarkerExtraIconOverride id */
            id?: (number|Long|null);

            /** MarkerExtraIconOverride minZoom */
            minZoom?: (number|null);

            /** MarkerExtraIconOverride maxZoom */
            maxZoom?: (number|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a MarkerExtraIconOverride. */
        type $Shape = kongying.MarkerExtraIconOverride.$Properties;
    }

    /**
     * Properties of a MarkerExtra28Island.
     * @deprecated Use kongying.MarkerExtra28Island.$Properties instead.
     */
    interface IMarkerExtra28Island extends kongying.MarkerExtra28Island.$Properties {
    }

    /** Represents a MarkerExtra28Island. */
    class MarkerExtra28Island {

        /**
         * Constructs a new MarkerExtra28Island.
         * @param [properties] Properties to set
         */
        constructor(properties?: kongying.MarkerExtra28Island.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** MarkerExtra28Island islandName. */
        islandName: string;

        /** MarkerExtra28Island islandState. */
        islandState: string[];

        /**
         * Creates a new MarkerExtra28Island instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MarkerExtra28Island instance
         */
        static create(properties: kongying.MarkerExtra28Island.$Shape): kongying.MarkerExtra28Island & kongying.MarkerExtra28Island.$Shape;
        static create(properties?: kongying.MarkerExtra28Island.$Properties): kongying.MarkerExtra28Island;

        /**
         * Encodes the specified MarkerExtra28Island message. Does not implicitly {@link kongying.MarkerExtra28Island.verify|verify} messages.
         * @param message MarkerExtra28Island message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: kongying.MarkerExtra28Island.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MarkerExtra28Island message, length delimited. Does not implicitly {@link kongying.MarkerExtra28Island.verify|verify} messages.
         * @param message MarkerExtra28Island message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: kongying.MarkerExtra28Island.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MarkerExtra28Island message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {kongying.MarkerExtra28Island & kongying.MarkerExtra28Island.$Shape} MarkerExtra28Island
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kongying.MarkerExtra28Island & kongying.MarkerExtra28Island.$Shape;

        /**
         * Decodes a MarkerExtra28Island message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {kongying.MarkerExtra28Island & kongying.MarkerExtra28Island.$Shape} MarkerExtra28Island
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kongying.MarkerExtra28Island & kongying.MarkerExtra28Island.$Shape;

        /**
         * Verifies a MarkerExtra28Island message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MarkerExtra28Island message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MarkerExtra28Island
         */
        static fromObject(object: { [k: string]: any }): kongying.MarkerExtra28Island;

        /**
         * Creates a plain object from a MarkerExtra28Island message. Also converts values to other types if specified.
         * @param message MarkerExtra28Island
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: kongying.MarkerExtra28Island, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MarkerExtra28Island to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for MarkerExtra28Island
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace MarkerExtra28Island {

        /** Properties of a MarkerExtra28Island. */
        interface $Properties {

            /** MarkerExtra28Island islandName */
            islandName?: (string|null);

            /** MarkerExtra28Island islandState */
            islandState?: (string[]|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a MarkerExtra28Island. */
        type $Shape = kongying.MarkerExtra28Island.$Properties;
    }

    /**
     * Properties of a MarkerVoList.
     * @deprecated Use kongying.MarkerVoList.$Properties instead.
     */
    interface IMarkerVoList extends kongying.MarkerVoList.$Properties {
    }

    /** Represents a MarkerVoList. */
    class MarkerVoList {

        /**
         * Constructs a new MarkerVoList.
         * @param [properties] Properties to set
         */
        constructor(properties?: kongying.MarkerVoList.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** MarkerVoList markers. */
        markers: kongying.MarkerVo.$Properties[];

        /** MarkerVoList users. */
        users: { [k: string]: kongying.SysUserSmallVo.$Properties };

        /**
         * Creates a new MarkerVoList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MarkerVoList instance
         */
        static create(properties: kongying.MarkerVoList.$Shape): kongying.MarkerVoList & kongying.MarkerVoList.$Shape;
        static create(properties?: kongying.MarkerVoList.$Properties): kongying.MarkerVoList;

        /**
         * Encodes the specified MarkerVoList message. Does not implicitly {@link kongying.MarkerVoList.verify|verify} messages.
         * @param message MarkerVoList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: kongying.MarkerVoList.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MarkerVoList message, length delimited. Does not implicitly {@link kongying.MarkerVoList.verify|verify} messages.
         * @param message MarkerVoList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: kongying.MarkerVoList.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MarkerVoList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {kongying.MarkerVoList & kongying.MarkerVoList.$Shape} MarkerVoList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kongying.MarkerVoList & kongying.MarkerVoList.$Shape;

        /**
         * Decodes a MarkerVoList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {kongying.MarkerVoList & kongying.MarkerVoList.$Shape} MarkerVoList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kongying.MarkerVoList & kongying.MarkerVoList.$Shape;

        /**
         * Verifies a MarkerVoList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MarkerVoList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MarkerVoList
         */
        static fromObject(object: { [k: string]: any }): kongying.MarkerVoList;

        /**
         * Creates a plain object from a MarkerVoList message. Also converts values to other types if specified.
         * @param message MarkerVoList
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: kongying.MarkerVoList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MarkerVoList to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for MarkerVoList
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace MarkerVoList {

        /** Properties of a MarkerVoList. */
        interface $Properties {

            /** MarkerVoList markers */
            markers?: (kongying.MarkerVo.$Properties[]|null);

            /** MarkerVoList users */
            users?: ({ [k: string]: kongying.SysUserSmallVo.$Properties }|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a MarkerVoList. */
        type $Shape = kongying.MarkerVoList.$Properties;
    }

    /**
     * Properties of a SysUserSmallVo.
     * @deprecated Use kongying.SysUserSmallVo.$Properties instead.
     */
    interface ISysUserSmallVo extends kongying.SysUserSmallVo.$Properties {
    }

    /** Represents a SysUserSmallVo. */
    class SysUserSmallVo {

        /**
         * Constructs a new SysUserSmallVo.
         * @param [properties] Properties to set
         */
        constructor(properties?: kongying.SysUserSmallVo.$Properties);

        /** Unknown fields preserved while decoding when enabled */
        $unknowns?: Uint8Array[];

        /** SysUserSmallVo username. */
        username: string;

        /** SysUserSmallVo nickname. */
        nickname: string;

        /** SysUserSmallVo qq. */
        qq: string;

        /** SysUserSmallVo phone. */
        phone?: (string|null);

        /** SysUserSmallVo logo. */
        logo?: (string|null);

        /** SysUserSmallVo remark. */
        remark?: (string|null);

        /**
         * Creates a new SysUserSmallVo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SysUserSmallVo instance
         */
        static create(properties: kongying.SysUserSmallVo.$Shape): kongying.SysUserSmallVo & kongying.SysUserSmallVo.$Shape;
        static create(properties?: kongying.SysUserSmallVo.$Properties): kongying.SysUserSmallVo;

        /**
         * Encodes the specified SysUserSmallVo message. Does not implicitly {@link kongying.SysUserSmallVo.verify|verify} messages.
         * @param message SysUserSmallVo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encode(message: kongying.SysUserSmallVo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SysUserSmallVo message, length delimited. Does not implicitly {@link kongying.SysUserSmallVo.verify|verify} messages.
         * @param message SysUserSmallVo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        static encodeDelimited(message: kongying.SysUserSmallVo.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SysUserSmallVo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns {kongying.SysUserSmallVo & kongying.SysUserSmallVo.$Shape} SysUserSmallVo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kongying.SysUserSmallVo & kongying.SysUserSmallVo.$Shape;

        /**
         * Decodes a SysUserSmallVo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns {kongying.SysUserSmallVo & kongying.SysUserSmallVo.$Shape} SysUserSmallVo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kongying.SysUserSmallVo & kongying.SysUserSmallVo.$Shape;

        /**
         * Verifies a SysUserSmallVo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SysUserSmallVo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SysUserSmallVo
         */
        static fromObject(object: { [k: string]: any }): kongying.SysUserSmallVo;

        /**
         * Creates a plain object from a SysUserSmallVo message. Also converts values to other types if specified.
         * @param message SysUserSmallVo
         * @param [options] Conversion options
         * @returns Plain object
         */
        static toObject(message: kongying.SysUserSmallVo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SysUserSmallVo to JSON.
         * @returns JSON object
         */
        toJSON(): { [k: string]: any };

        /**
         * Gets the type url for SysUserSmallVo
         * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
         * @returns The type url
         */
        static getTypeUrl(prefix?: string): string;
    }

    namespace SysUserSmallVo {

        /** Properties of a SysUserSmallVo. */
        interface $Properties {

            /** SysUserSmallVo username */
            username?: (string|null);

            /** SysUserSmallVo nickname */
            nickname?: (string|null);

            /** SysUserSmallVo qq */
            qq?: (string|null);

            /** SysUserSmallVo phone */
            phone?: (string|null);

            /** SysUserSmallVo logo */
            logo?: (string|null);

            /** SysUserSmallVo remark */
            remark?: (string|null);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];
        }

        /** Shape of a SysUserSmallVo. */
        type $Shape = kongying.SysUserSmallVo.$Properties;
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /**
         * Properties of a Timestamp.
         * @deprecated Use google.protobuf.Timestamp.$Properties instead.
         */
        interface ITimestamp extends google.protobuf.Timestamp.$Properties {
        }

        /** Represents a Timestamp. */
        class Timestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.Timestamp.$Properties);

            /** Unknown fields preserved while decoding when enabled */
            $unknowns?: Uint8Array[];

            /** Timestamp seconds. */
            seconds: (number|Long);

            /** Timestamp nanos. */
            nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            static create(properties: google.protobuf.Timestamp.$Shape): google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape;
            static create(properties?: google.protobuf.Timestamp.$Properties): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encode(message: google.protobuf.Timestamp.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            static encodeDelimited(message: google.protobuf.Timestamp.$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp & google.protobuf.Timestamp.$Shape;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            toJSON(): { [k: string]: any };

            /**
             * Gets the type url for Timestamp
             * @param [prefix] Custom type url prefix, defaults to `"type.googleapis.com"`
             * @returns The type url
             */
            static getTypeUrl(prefix?: string): string;
        }

        namespace Timestamp {

            /** Properties of a Timestamp. */
            interface $Properties {

                /** Timestamp seconds */
                seconds?: (number|Long|null);

                /** Timestamp nanos */
                nanos?: (number|null);

                /** Unknown fields preserved while decoding when enabled */
                $unknowns?: Uint8Array[];
            }

            /** Shape of a Timestamp. */
            type $Shape = google.protobuf.Timestamp.$Properties;
        }
    }
}

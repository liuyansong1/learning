var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var CurvedGlitterMaterial = /** @class */ (function (_super) {
    __extends(CurvedGlitterMaterial, _super);
    function CurvedGlitterMaterial() {
        var _this = _super.call(this) || this;
        _this.setShaderName("CURVEDGLITTER");
        _this.renderMode = CurvedGlitterMaterial.RENDERMODE_OPAQUE;
        _this._setColor(CurvedGlitterMaterial.MAINCOLOR, new Laya.Vector4(1, 1, 1, 1));
        _this._setColor(CurvedGlitterMaterial.QOFFSET, new Laya.Vector4(0, 0, 0, 1));
        _this._setNumber(CurvedGlitterMaterial.DIST, 10);
        return _this;
    }
    Object.defineProperty(CurvedGlitterMaterial.prototype, "mainTexture", {
        get: function () {
            return this._getTexture(CurvedGlitterMaterial.MAINTEXTURE);
        },
        set: function (t) {
            t ? this._addShaderDefine(CurvedGlitterMaterial.SHADERDEFINE_MAINTMAP) : this._removeShaderDefine(CurvedGlitterMaterial.SHADERDEFINE_MAINTMAP);
            this._setTexture(CurvedGlitterMaterial.MAINTEXTURE, t);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurvedGlitterMaterial.prototype, "qOffset", {
        get: function () {
            return this._getColor(CurvedGlitterMaterial.QOFFSET);
        },
        set: function (t) {
            this._setColor(CurvedGlitterMaterial.QOFFSET, t);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurvedGlitterMaterial.prototype, "mainColor", {
        get: function () {
            return this._getColor(CurvedGlitterMaterial.MAINCOLOR);
        },
        set: function (t) {
            this._setColor(CurvedGlitterMaterial.MAINCOLOR, t);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurvedGlitterMaterial.prototype, "dist", {
        get: function () {
            return this._getNumber(CurvedGlitterMaterial.DIST);
        },
        set: function (t) {
            this._setNumber(CurvedGlitterMaterial.DIST, t);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CurvedGlitterMaterial.prototype, "renderMode", {
        set: function (t) {
            switch (t) {
                case CurvedGlitterMaterial.RENDERMODE_OPAQUE:
                    this.renderQueue = Laya.RenderQueue.OPAQUE;
                    this.depthWrite = true;
                    this.cull = Laya.BaseMaterial.CULL_BACK;
                    this.blend = Laya.BaseMaterial.BLEND_DISABLE;
                    this.alphaTest = false;
                    this.depthTest = Laya.BaseMaterial.DEPTHTEST_LESS;
                    break;
                case CurvedGlitterMaterial.RENDEMODE_TRANSPARENT:
                    this.renderQueue = Laya.RenderQueue.TRANSPARENT;
                    this.depthWrite = true;
                    this.cull = Laya.BaseMaterial.CULL_BACK;
                    this.blend = Laya.BaseMaterial.BLEND_ENABLE_ALL;
                    this.srcBlend = Laya.BaseMaterial.BLENDPARAM_SRC_ALPHA;
                    this.dstBlend = Laya.BaseMaterial.BLENDPARAM_ONE_MINUS_SRC_ALPHA;
                    this.alphaTest = false;
                    this.depthTest = Laya.BaseMaterial.DEPTHTEST_LESS;
            }
        },
        enumerable: true,
        configurable: true
    });
    CurvedGlitterMaterial.initShader = function () {
        var t = Laya.Shader3D.nameKey.add("CURVEDGLITTER");
        var i = {
            a_Position: Laya.VertexElementUsage.POSITION0,
            a_Texcoord: Laya.VertexElementUsage.TEXTURECOORDINATE0,
            a_Time: Laya.VertexElementUsage.TIME0,
        };
        var n = {
            u_MMatrix: [Laya.Sprite3D.WORLDMATRIX, Laya.Shader3D.PERIOD_SPRITE],
            u_VMatrix: [Laya.BaseCamera.VIEWMATRIX, Laya.Shader3D.PERIOD_CAMERA],
            u_PMatrix: [Laya.BaseCamera.PROJECTMATRIX, Laya.Shader3D.PERIOD_CAMERA],
            u_MainColor: [this.MAINCOLOR, Laya.Shader3D.PERIOD_MATERIAL],
            u_MainTexture: [this.MAINTEXTURE, Laya.Shader3D.PERIOD_MATERIAL],
            u_Dist: [this.DIST, Laya.Shader3D.PERIOD_MATERIAL],
            u_QOffset: [this.QOFFSET, Laya.Shader3D.PERIOD_MATERIAL],
            u_CurrentTime: [Laya.Glitter.CURRENTTIME, Laya.Shader3D.PERIOD_SPRITE],
            u_Duration: [Laya.Glitter.DURATION, Laya.Shader3D.PERIOD_SPRITE]
        };
        var r = Laya.ShaderCompile3D.add(t, "attribute vec4 a_Position;\nattribute float a_Time;\nuniform mat4 u_MMatrix;\nuniform mat4 u_VMatrix;\nuniform mat4 u_PMatrix;\nuniform float u_Dist;\nuniform vec4 u_QOffset;\n#ifdef MAINMAP\nattribute vec2 a_Texcoord;\nvarying vec2 v_Texcoord;\n#endif\nuniform float u_CurrentTime;\nuniform vec4 u_MainColor;\nuniform float u_Duration;\nvarying vec4 v_Color;\nvoid main(){\n#ifdef MAINMAP\nv_Texcoord = a_Texcoord;\n#endif\nfloat age = u_CurrentTime-a_Time;\nfloat normalizedAge = clamp(age / u_Duration,0.0,1.0);\nv_Color=u_MainColor;\nv_Color.a*=1.0-normalizedAge;\nvec4 vPos =  u_VMatrix * u_MMatrix *a_Position;\nfloat zOff = vPos.z/u_Dist;\nvPos += u_QOffset*zOff*zOff;\ngl_Position = u_PMatrix * vPos;\n}", "#ifdef FSHIGHPRECISION\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n#ifdef MAINMAP\nuniform sampler2D u_MainTexture;\nvarying vec2 v_Texcoord;\n#endif\nvarying vec4 v_Color;\nvoid main(){\nvec4 mainColor = v_Color;\n#ifdef MAINMAP\nvec4 texColor = texture2D(u_MainTexture,v_Texcoord);\nmainColor.rgba = mainColor.rgba * texColor.rgba;\n#endif\ngl_FragColor = mainColor;\n}\n", i, n);
        this.SHADERDEFINE_MAINTMAP = r.registerMaterialDefine("MAINMAP");
    };
    CurvedGlitterMaterial.RENDERMODE_OPAQUE = 0;
    CurvedGlitterMaterial.RENDEMODE_TRANSPARENT = 1;
    CurvedGlitterMaterial.MAINTEXTURE = 1;
    CurvedGlitterMaterial.MAINCOLOR = 2;
    CurvedGlitterMaterial.DIST = 3;
    CurvedGlitterMaterial.QOFFSET = 4;
    return CurvedGlitterMaterial;
}(Laya.BaseMaterial));
//# sourceMappingURL=CurvedGlitterMaterial.js.map
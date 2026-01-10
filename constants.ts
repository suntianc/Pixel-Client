


import { LLMProvider, LLMModel, Theme, AceConfig, Language } from './types';
import React from 'react';

// ApexBridge Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:12345';
export const API_KEY = import.meta.env.VITE_API_KEY || '';

// API Configuration
export const API_TIMEOUT = 5000; // milliseconds
export const CACHE_TTL = 3 * 60 * 1000; // 3 minutes

// Model Default Values
export const DEFAULT_TEMPERATURE = 0.7;
export const DEFAULT_CONTEXT_LENGTH = 4096;
export const DEFAULT_MAX_TOKENS = 2048;
export const DEFAULT_DIMENSIONS = 1536;
export const MAX_CONTEXT_LENGTH = 200000;
export const EMBEDDING_DIMENSIONS = [768, 1024, 1536, 2048, 3072, 4096] as const;

// LLM Service Configuration
export const DEFAULT_AGENT_ID = 'pixel-verse-agent';
export const DEFAULT_CONVERSATION_ID = 'pixel-session-1';
export const DEFAULT_USER_ID = 'pixel-user';

// UI Constants
export const COPY_BUTTON_TIMEOUT = 2000; // milliseconds
export const SCROLL_THRESHOLD = 100; // pixels
export const MAX_MESSAGES_HISTORY = 100;

export const INITIAL_PROVIDERS: LLMProvider[] = []; 
export const INITIAL_MODELS: LLMModel[] = []; 

export const INITIAL_ACE_CONFIG: AceConfig = {
  fastModelId: '',
  reflectorModelId: '',
  curatorModelId: ''
};

// Use React.createElement to avoid JSX syntax in .ts file
export const PROVIDER_LOGOS: Record<string, React.ReactNode> = {
  openai: React.createElement("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-full h-full" },
    React.createElement("path", { d: "M21.55 10.004a5.416 5.416 0 00-.478-4.501c-1.217-2.09-3.662-3.166-6.05-2.66A5.59 5.59 0 0010.831 1C8.39.995 6.224 2.546 5.473 4.838A5.553 5.553 0 001.76 7.496a5.487 5.487 0 00.691 6.5 5.416 5.416 0 00.477 4.502c1.217 2.09 3.662 3.165 6.05 2.66A5.586 5.586 0 0013.168 23c2.443.006 4.61-1.546 5.361-3.84a5.553 5.553 0 003.715-2.66 5.488 5.488 0 00-.693-6.497v.001zm-8.381 11.558a4.199 4.199 0 01-2.675-.954c.034-.018.093-.05.132-.074l4.44-2.53a.71.71 0 00.364-.623v-6.176l1.877 1.069c.02.01.033.029.036.05v5.115c-.003 2.274-1.87 4.118-4.174 4.123zM4.192 17.78a4.059 4.059 0 01-.498-2.763c.032.02.09.055.131.078l4.44 2.53c.225.13.504.13.73 0l5.42-3.088v2.138a.068.068 0 01-.027.057L9.9 19.288c-1.999 1.136-4.552.46-5.707-1.51h-.001zM3.023 8.216A4.15 4.15 0 015.198 6.41l-.002.151v5.06a.711.711 0 00.364.624l5.42 3.087-1.876 1.07a.067.067 0 01-.063.005l-4.489-2.559c-1.995-1.14-2.679-3.658-1.53-5.63h.001zm15.417 3.54l-5.42-3.088L14.896 7.6a.067.067 0 01.063-.006l4.489 2.557c1.998 1.14 2.683 3.662 1.529 5.633a4.163 4.163 0 01-2.174 1.807V12.38a.71.71 0 00-.363-.623zm1.867-2.773a6.04 6.04 0 00-.132-.078l-4.44-2.53a.731.731 0 00-.729 0l-5.42 3.088V7.325a.068.068 0 01.027-.057L14.1 4.713c2-1.137 4.555-.46 5.707 1.513.487.833.664 1.809.499 2.757h.001zm-11.741 3.81l-1.877-1.068a.065.065 0 01-.036-.051V6.559c.001-2.277 1.873-4.122 4.181-4.12.976 0 1.92.338 2.671.954-.034.018-.092.05-.131.073l-4.44 2.53a.71.71 0 00-.365.623l-.003 6.173v.002zm1.02-2.168L12 9.25l2.414 1.375v2.75L12 14.75l-2.415-1.375v-2.75z" })
  ),
  anthropic: React.createElement("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-full h-full" },
    React.createElement("path", { d: "M17.802 18.917h3.042l-7.98-16.732h-3.03l-7.962 16.732h3.155l1.638-3.708h9.414l1.723 3.708Zm-10.457-6.095L11.34 4.303l4.032 8.52H7.345Z" })
  ),
  claude: React.createElement("svg", { viewBox: "0 0 24 24", className: "w-full h-full" },
    React.createElement("path", { fill: "#D97757", d: "M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" })
  ),
  google: React.createElement("svg", { viewBox: "0 0 24 24", className: "w-full h-full" },
    React.createElement("path", { fill: "#4285F4", d: "M23 12.245c0-.905-.075-1.565-.236-2.25h-10.54v4.083h6.186c-.124 1.014-.797 2.542-2.294 3.569l-.021.136 3.332 2.53.23.022C21.779 18.417 23 15.593 23 12.245z" }),
    React.createElement("path", { fill: "#34A853", d: "M12.225 23c3.03 0 5.574-.978 7.433-2.665l-3.542-2.688c-.948.648-2.22 1.1-3.891 1.1a6.745 6.745 0 01-6.386-4.572l-.132.011-3.465 2.628-.045.124C4.043 20.531 7.835 23 12.225 23z" }),
    React.createElement("path", { fill: "#FBBC05", d: "M5.84 14.175A6.65 6.65 0 015.463 12c0-.758.138-1.491.361-2.175l-.006-.147-3.508-2.67-.115.054A10.831 10.831 0 001 12c0 1.772.436 3.447 1.197 4.938l3.642-2.763z" }),
    React.createElement("path", { fill: "#EB4335", d: "M12.225 5.253c2.108 0 3.529.892 4.34 1.638l3.167-3.031C17.787 2.088 15.255 1 12.225 1 7.834 1 4.043 3.469 2.197 7.062l3.63 2.763a6.77 6.77 0 016.398-4.572z" })
  ),
  deepseek: React.createElement("svg", { viewBox: "0 0 24 24", className: "w-full h-full" },
    React.createElement("path", { fill: "#4D6BFE", d: "M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614zm1-6.44a.306.306 0 01.415-.287.302.302 0 01.2.288.306.306 0 01-.31.307.303.303 0 01-.304-.308zm3.11 1.596c-.2.081-.399.151-.59.16a1.245 1.245 0 01-.798-.254c-.274-.23-.47-.358-.552-.758a1.73 1.73 0 01.016-.588c.07-.327-.008-.537-.239-.727-.187-.156-.426-.199-.688-.199a.559.559 0 01-.254-.078c-.11-.054-.2-.19-.114-.358.028-.054.16-.186.192-.21.356-.202.767-.136 1.146.016.352.144.618.408 1.001.782.391.451.462.576.685.914.176.265.336.537.445.848.067.195-.019.354-.25.452z" })
  ),
  qwen: React.createElement("svg", { viewBox: "0 0 24 24", className: "w-full h-full" },
    React.createElement("path", { fill: "url(#lobe-icons-qwen-fill)", d: "M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z" })
  ),
  zhipu: React.createElement("svg", { viewBox: "0 0 24 24", className: "w-full h-full" },
    React.createElement("path", { fill: "#3859FF", d: "M11.991 23.503a.24.24 0 00-.244.248.24.24 0 00.244.249.24.24 0 00.245-.249.24.24 0 00-.22-.247l-.025-.001zM9.671 5.365a1.697 1.697 0 011.099 2.132l-.071.172-.016.04-.018.054c-.07.16-.104.32-.104.498-.035.71.47 1.279 1.186 1.314h.366c1.309.053 2.338 1.173 2.286 2.523-.052 1.332-1.152 2.38-2.478 2.327h-.174c-.715.018-1.274.64-1.239 1.368 0 .124.018.23.053.337.209.373.54.658.96.8.75.23 1.517-.125 1.9-.782l.018-.035c.402-.64 1.17-.96 1.92-.711.854.284 1.378 1.226 1.099 2.167a1.661 1.661 0 01-2.077 1.102 1.711 1.711 0 01-.907-.711l-.017-.035c-.2-.323-.463-.58-.851-.711l-.056-.018a1.646 1.646 0 00-1.954.746 1.66 1.66 0 01-1.065.764 1.677 1.677 0 01-1.989-1.279c-.209-.906.332-1.83 1.257-2.043a1.51 1.51 0 01.296-.035h.018c.68-.071 1.151-.622 1.116-1.333a1.307 1.307 0 00-.227-.693 2.515 2.515 0 01-.366-1.403 2.39 2.39 0 01.366-1.208c.14-.195.21-.444.227-.693.018-.71-.506-1.261-1.186-1.332l-.07-.018a1.43 1.43 0 01-.299-.07l-.05-.019a1.7 1.7 0 01-1.047-2.114 1.68 1.68 0 012.094-1.101zm-5.575 10.11c.26-.264.639-.367.994-.27.355.096.633.379.728.74.095.362-.007.748-.267 1.013-.402.41-1.053.41-1.455 0a1.062 1.062 0 010-1.482zm14.845-.294c.359-.09.738.024.992.297.254.274.344.665.237 1.025-.107.36-.396.634-.756.718-.551.128-1.1-.22-1.23-.781a1.05 1.05 0 01.757-1.26zm-.064-4.39c.314.32.49.753.49 1.206 0 .452-.176.886-.49 1.206-.315.32-.74.5-1.185.5-.444 0-.87-.18-1.184-.5a1.727 1.727 0 010-2.412 1.654 1.654 0 012.369 0zm-11.243.163c.364.484.447 1.128.218 1.691a1.665 1.665 0 01-2.188.923c-.855-.36-1.26-1.358-.907-2.228a1.68 1.68 0 011.33-1.038c.593-.08 1.183.169 1.547.652zm11.545-4.221c.368 0 .708.2.892.524.184.324.184.724 0 1.048a1.026 1.026 0 01-.892.524c-.568 0-1.03-.47-1.03-1.048 0-.579.462-1.048 1.03-1.048zm-14.358 0c.368 0 .707.2.891.524.184.324.184.724 0 1.048a1.026 1.026 0 01-.891.524c-.569 0-1.03-.47-1.03-1.048 0-.579.461-1.048 1.03-1.048zm10.031-1.475c.925 0 1.675.764 1.675 1.706s-.75 1.705-1.675 1.705-1.674-.763-1.674-1.705c0-.942.75-1.706 1.674-1.706zm-2.626-.684c.362-.082.653-.356.761-.718a1.062 1.062 0 00-.238-1.028 1.017 1.017 0 00-.996-.294c-.547.14-.881.7-.752 1.257.13.558.675.907 1.225.783zm0 16.876c.359-.087.644-.36.75-.72a1.062 1.062 0 00-.237-1.019 1.018 1.018 0 00-.985-.301 1.037 1.037 0 00-.762.717c-.108.361-.017.754.239 1.028.245.263.606.377.953.305l.043-.01zM17.19 3.5a.631.631 0 00.628-.64c0-.355-.279-.64-.628-.64a.631.631 0 00-.628.64c0 .355.28.64.628.64zm-10.38 0a.631.631 0 00.628-.64c0-.355-.28-.64-.628-.64a.631.631 0 00-.628.64c0 .355.279.64.628.64zm-5.182 7.852a.631.631 0 00-.628.64c0 .354.28.639.628.639a.63.63 0 00.627-.606l.001-.034a.62.62 0 00-.628-.64zm5.182 9.13a.631.631 0 00-.628.64c0 .355.279.64.628.64a.631.631 0 00.628-.64c0-.355-.28-.64-.628-.64zm10.38.018a.631.631 0 00-.628.64c0 .355.28.64.628.64a.631.631 0 00.628-.64c0-.355-.279-.64-.628-.64zm5.182-9.148a.631.631 0 00-.628.64c0 .354.279.639.628.639a.631.631 0 00.628-.64c0-.355-.28-.64-.628-.64zm-.384-4.992a.24.24 0 00.244-.249.24.24 0 00-.244-.249.24.24 0 00-.244.249c0 .142.122.249.244.249zM11.991.497a.24.24 0 00.245-.248A.24.24 0 0011.99 0a.24.24 0 00-.244.249c0 .133.108.236.223.247l.021.001zM2.011 6.36a.24.24 0 00.245-.249.24.24 0 00-.244-.249.24.24 0 00-.244.249.24.24 0 00.244.249zm0 11.263a.24.24 0 00-.243.248.24.24 0 00.244.249.24.24 0 00.244-.249.252.252 0 00-.244-.248zm19.995-.018a.24.24 0 00-.245.248.24.24 0 00.245.25.24.24 0 00.244-.25.252.252 0 00-.244-.248z" })
  ),
  minimax: React.createElement("svg", { viewBox: "0 0 24 24", className: "w-full h-full" },
    React.createElement("path", { fill: "url(#lobe-icons-minimax-fill)", d: "M16.278 2c1.156 0 2.093.927 2.093 2.07v12.501a.74.74 0 00.744.709.74.74 0 00.743-.709V9.099a2.06 2.06 0 012.071-2.049A2.06 2.06 0 0124 9.1v6.561a.649.649 0 01-.652.645.649.649 0 01-.653-.645V9.1a.762.762 0 00-.766-.758.762.762 0 00-.766.758v7.472a2.037 2.037 0 01-2.048 2.026 2.037 2.037 0 01-2.048-2.026v-12.5a.785.785 0 00-.788-.753.785.785 0 00-.789.752l-.001 15.904A2.037 2.037 0 0113.441 22a2.037 2.037 0 01-2.048-2.026V18.04c0-.356.292-.645.652-.645.36 0 .652.289.652.645v1.934c0 .263.142.506.372.638.23.131.514.131.744 0a.734.734 0 00.372-.638V4.07c0-1.143.937-2.07 2.093-2.07zm-5.674 0c1.156 0 2.093.927 2.093 2.07v11.523a.648.648 0 01-.652.645.648.648 0 01-.652-.645V4.07a.785.785 0 00-.789-.78.785.785 0 00-.789.78v14.013a2.06 2.06 0 01-2.07 2.048 2.06 2.06 0 01-2.071-2.048V9.1a.762.762 0 00-.766-.758.762.762 0 00-.766.758v3.8a2.06 2.06 0 01-2.071 2.049A2.06 2.06 0 010 12.9v-1.378c0-.357.292-.646.652-.646.36 0 .653.29.653.646V12.9c0 .418.343.757.766.757s.766-.339.766-.757V9.099a2.06 2.06 0 012.07-2.048 2.06 2.06 0 012.071 2.048v8.984c0 .419.343.758.767.758.423 0 .766-.339.766-.758V4.07c0-1.143.937-2.07 2.093-2.07z" })
  ),
  ollama: React.createElement("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-full h-full" },
    React.createElement("path", { d: "M7.905 1.09c.216.085.411.225.588.41.295.306.544.744.734 1.263.191.522.315 1.1.362 1.68a5.054 5.054 0 012.049-.636l.051-.004c.87-.07 1.73.087 2.48.474.101.053.2.11.297.17.05-.569.172-1.134.36-1.644.19-.52.439-.957.733-1.264a1.67 1.67 0 01.589-.41c.257-.1.53-.118.796-.042.401.114.745.368 1.016.737.248.337.434.769.561 1.287.23.934.27 2.163.115 3.645l.053.04.026.019c.757.576 1.284 1.397 1.563 2.35.435 1.487.216 3.155-.534 4.088l-.018.021.002.003c.417.762.67 1.567.724 2.4l.002.03c.064 1.065-.2 2.137-.814 3.19l-.007.01.01.024c.472 1.157.62 2.322.438 3.486l-.006.039a.651.651 0 01-.747.536.648.648 0 01-.54-.742c.167-1.033.01-2.069-.48-3.123a.643.643 0 01.04-.617l.004-.006c.604-.924.854-1.83.8-2.72-.046-.779-.325-1.544-.8-2.273a.644.644 0 01.18-.886l.009-.006c.243-.159.467-.565.58-1.12a4.229 4.229 0 00-.095-1.974c-.205-.7-.58-1.284-1.105-1.683-.595-.454-1.383-.673-2.38-.61a.653.653 0 01-.632-.371c-.314-.665-.772-1.141-1.343-1.436a3.288 3.288 0 00-1.772-.332c-1.245.099-2.343.801-2.67 1.686a.652.652 0 01-.61.425c-1.067.002-1.893.252-2.497.703-.522.39-.878.935-1.066 1.588a4.07 4.07 0 00-.068 1.886c.112.558.331 1.02.582 1.269l.008.007c.212.207.257.53.109.785-.36.622-.629 1.549-.673 2.44-.05 1.018.186 1.902.719 2.536l.016.019a.643.643 0 01.095.69c-.576 1.236-.753 2.252-.562 3.052a.652.652 0 01-1.269.298c-.243-1.018-.078-2.184.473-3.498l.014-.035-.008-.012a4.339 4.339 0 01-.598-1.309l-.005-.019a5.764 5.764 0 01-.177-1.785c.044-.91.278-1.842.622-2.59l.012-.026-.002-.002c-.293-.418-.51-.953-.63-1.545l-.005-.024a5.352 5.352 0 01.093-2.49c.262-.915.777-1.701 1.536-2.269.06-.045.123-.09.186-.132-.159-1.493-.119-2.73.112-3.67.127-.518.314-.95.562-1.287.27-.368.614-.622 1.015-.737.266-.076.54-.059.797.042zm4.116 9.09c.936 0 1.8.313 2.446.855.63.527 1.005 1.235 1.005 1.94 0 .888-.406 1.58-1.133 2.022-.62.375-1.451.557-2.403.557-1.009 0-1.871-.259-2.493-.734-.617-.47-.963-1.13-.963-1.845 0-.707.398-1.417 1.056-1.946.668-.537 1.55-.849 2.485-.849zm0 .896a3.07 3.07 0 00-1.916.65c-.461.37-.722.835-.722 1.25 0 .428.21.829.61 1.134.455.347 1.124.548 1.943.548.799 0 1.473-.147 1.932-.426.463-.28.7-.686.7-1.257 0-.423-.246-.89-.683-1.256-.484-.405-1.14-.643-1.864-.643zm.662 1.21l.004.004c.12.151.095.37-.056.49l-.292.23v.446a.375.375 0 01-.376.373.375.375 0 01-.376-.373v-.46l-.271-.218a.347.347 0 01-.052-.49.353.353 0 01.494-.051l.215.172.22-.174a.353.353 0 01.49.051zm-5.04-1.919c.478 0 .867.39.867.871a.87.87 0 01-.868.871.87.87 0 01-.867-.87.87.87 0 01.867-.872zm8.706 0c.48 0 .868.39.868.871a.87.87 0 01-.868.871.87.87 0 01-.867-.87.87.87 0 01.867-.872zM7.44 2.3l-.003.002a.659.659 0 00-.285.238l-.005.006c-.138.189-.258.467-.348.832-.17.692-.216 1.631-.124 2.782.43-.128.899-.208 1.404-.237l.01-.001.019-.034c.046-.082.095-.161.148-.239.123-.771.022-1.692-.253-2.444-.134-.364-.297-.65-.453-.813a.628.628 0 00-.107-.09L7.44 2.3zm9.174.04l-.002.001a.628.628 0 00-.107.09c-.156.163-.32.45-.453.814-.29.794-.387 1.776-.23 2.572l.058.097.008.014h.03a5.184 5.184 0 011.466.212c.086-1.124.038-2.043-.128-2.722-.09-.365-.21-.643-.349-.832l-.004-.006a.659.659 0 00-.285-.239h-.004z" })
  ),
  custom: React.createElement("svg", { viewBox: "0 0 24 24", fill: "currentColor", className: "w-full h-full" },
    React.createElement("path", { d: "M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" })
  )
};

export const getProviderIcon = (type: string): React.ReactNode => {
    const key = type.toLowerCase();
    if (key.includes('openai')) return PROVIDER_LOGOS.openai;
    if (key.includes('anthropic') || key.includes('claude')) return PROVIDER_LOGOS.claude;
    if (key.includes('google') || key.includes('gemini')) return PROVIDER_LOGOS.google;
    if (key.includes('deepseek')) return PROVIDER_LOGOS.deepseek;
    if (key.includes('qwen') || key.includes('aliyun') || key.includes('tongyi')) return PROVIDER_LOGOS.qwen;
    if (key.includes('zhipu') || key.includes('glm')) return PROVIDER_LOGOS.zhipu;
    if (key.includes('minimax')) return PROVIDER_LOGOS.minimax;
    if (key.includes('ollama')) return PROVIDER_LOGOS.ollama;
    return PROVIDER_LOGOS.custom;
};

// Expanded Theme System
export const THEME_STYLES = {
  // PIXEL DARK: High Contrast, Thick Borders, Sharp Edges
  [Theme.DARK]: {
    type: 'pixel',
    bg: 'bg-[#0F0E17]',
    text: 'text-[#FFECD1]',
    textMuted: 'text-[#FFECD1]/50',
    primary: 'bg-[#B957CE] hover:bg-[#D479E6]',
    primaryText: 'text-white',
    secondary: 'bg-[#1A1938]',
    secondaryText: 'text-[#FFECD1]',
    accent: 'text-[#00D4FF]',
    success: 'text-[#4ADE80]',
    warning: 'text-[#FBBF24]',
    error: 'text-[#F87171]',
    border: 'border-2 border-[#1A1938]',
    
    // Structural
    font: 'font-pixel-verse',
    radius: 'rounded-none',
    borderWidth: 'border-2',
    borderColor: 'border-[#1A1938]',
    shadow: 'pixel-shadow',
    inputBg: 'bg-[#14132A]',
    
    // Layout specifics
    sidebarBorder: 'border-r-4 border-[#1A1938]',
    headerBorder: 'border-b-4 border-[#1A1938]',
    card: 'border-4 border-[#1A1938] bg-[#1A1938] pixel-shadow',
    button: 'border-2 border-[#1A1938] pixel-shadow active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase tracking-widest font-bold'
  },
  // PIXEL LIGHT: Warm cream palette with refined colors
  [Theme.LIGHT]: {
    type: 'pixel',
    bg: 'bg-[#FFF8F0]',
    text: 'text-[#2D1B2E]',
    textMuted: 'text-[#2D1B2E]/50',
    primary: 'bg-[#E06C9C] hover:bg-[#E88BB0]',
    primaryText: 'text-white',
    secondary: 'bg-[#F5EFE6]',
    secondaryText: 'text-[#2D1B2E]',
    accent: 'text-[#9D4EDD]',
    success: 'text-[#22C55E]',
    warning: 'text-[#EAB308]',
    error: 'text-[#EF4444]',
    border: 'border-2 border-[#2D1B2E]',
    
    // Structural
    font: 'font-pixel-verse',
    radius: 'rounded-none',
    borderWidth: 'border-2',
    borderColor: 'border-[#2D1B2E]',
    shadow: 'shadow-[4px_4px_0px_0px_#2D1B2E]',
    inputBg: 'bg-[#FFFFFF]',
    
    // Layout specifics
    sidebarBorder: 'border-r-4 border-[#2D1B2E]',
    headerBorder: 'border-b-4 border-[#2D1B2E]',
    card: 'border-4 border-[#2D1B2E] bg-[#F5EFE6] shadow-[4px_4px_0px_0px_#2D1B2E]',
    button: 'border-2 border-[#2D1B2E] shadow-[4px_4px_0px_0px_#2D1B2E] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase tracking-widest font-bold'
  },
  // SHADCN DARK: Clean minimal with subtle gradient and accent
  [Theme.SHADCN_DARK]: {
    type: 'modern',
    bg: 'bg-[#09090b] bg-gradient-to-b from-[#1A1A24] to-[#09090b]',
    text: 'text-[#FAFAFA]',
    textMuted: 'text-[#A1A1AA]',
    primary: 'bg-[#FAFAFA] hover:bg-[#E4E4E7] text-[#09090B]',
    primaryText: 'text-[#09090B]',
    secondary: 'bg-[#18181B] hover:bg-[#27272A]',
    secondaryText: 'text-[#FAFAFA]',
    accent: 'text-[#A78BFA]',
    success: 'text-[#4ADE80]',
    warning: 'text-[#FBBF24]',
    error: 'text-[#F87171]',
    border: 'border-[#27272A]',
    
    // Structural
    font: 'font-sans',
    radius: 'rounded-lg',
    borderWidth: 'border',
    borderColor: 'border-[#27272A]',
    shadow: 'shadow-lg',
    inputBg: 'bg-[#18181B]',
    
    // Layout specifics
    sidebarBorder: 'border-r border-[#27272A]',
    headerBorder: 'border-b border-[#27272A]',
    card: 'bg-[#09090b]/80 backdrop-blur-sm border border-[#27272A]',
    button: 'rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090b]'
  },
  // SHADCN LIGHT: Clean minimal with warmth
  [Theme.SHADCN_LIGHT]: {
    type: 'modern',
    bg: 'bg-[#FAFAFA]',
    text: 'text-[#18181B]',
    textMuted: 'text-[#71717A]',
    primary: 'bg-[#18181B] hover:bg-[#27272A] text-white',
    primaryText: 'text-white',
    secondary: 'bg-[#F4F4F5] hover:bg-[#E4E4E7]',
    secondaryText: 'text-[#18181B]',
    accent: 'text-[#7C3AED]',
    success: 'text-[#22C55E]',
    warning: 'text-[#EAB308]',
    error: 'text-[#EF4444]',
    border: 'border-[#E4E4E7]',
    
    // Structural
    font: 'font-sans',
    radius: 'rounded-xl',
    borderWidth: 'border',
    borderColor: 'border-[#E4E4E7]',
    shadow: 'shadow-lg',
    inputBg: 'bg-[#FFFFFF]',
    
    // Layout specifics
    sidebarBorder: 'border-r border-[#E4E4E7]',
    headerBorder: 'border-b border-[#E4E4E7]',
    card: 'bg-white border border-[#E4E4E7]',
    button: 'rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAFA]'
  },
  // CYBER NEON: Cyberpunk aesthetics with glowing neon accents
  [Theme.CYBER]: {
    type: 'cyber',
    bg: 'bg-[#050510]',
    text: 'text-[#E0E0E0]',
    textMuted: 'text-[#E0E0E0]/50',
    primary: 'bg-[#00FFE1] text-black shadow-[0_0_20px_rgba(0,255,225,0.5)]',
    primaryHover: 'bg-[#33FFF5] shadow-[0_0_30px_rgba(0,255,225,0.7)]',
    primaryText: 'text-black',
    secondary: 'bg-[#1A1A3A]',
    secondaryText: 'text-[#E0E0E0]',
    accent: 'text-[#FF00FF]',
    success: 'text-[#00FF88]',
    warning: 'text-[#FFDD00]',
    error: 'text-[#FF3366]',
    border: 'border-[#00FFE1]',
    
    // Structural
    font: 'font-sans',
    radius: 'rounded-none',
    borderWidth: 'border',
    borderColor: 'border-[#00FFE1]',
    shadow: 'cyber-shadow',
    inputBg: 'bg-[#0A0A20]',
    
    // Layout specifics
    sidebarBorder: 'border-r border-[#00FFE1]/30',
    headerBorder: 'border-b border-[#00FFE1]/30',
    card: 'bg-[#0A0A20] border border-[#00FFE1]/50 shadow-[0_0_15px_rgba(0,255,225,0.2)]',
    button: 'border border-[#00FFE1] shadow-[0_0_10px_rgba(0,255,225,0.3)] transition-all hover:shadow-[0_0_20px_rgba(0,255,225,0.5)]'
  },
  // SUNSET GLOW: Warm gradient aesthetic with glassmorphism
  [Theme.SUNSET]: {
    type: 'glass',
    bg: 'bg-[#1C1C1E] bg-gradient-to-br from-[#2D2D32] to-[#1C1C1E]',
    text: 'text-[#FFFBF5]',
    textMuted: 'text-[#FFFBF5]/50',
    primary: 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] text-white',
    primaryHover: 'bg-gradient-to-r from-[#FF8C5A] to-[#FFB347]',
    primaryText: 'text-white',
    secondary: 'bg-[#2D2D32]',
    secondaryText: 'text-[#FFFBF5]',
    accent: 'text-[#FFB347]',
    success: 'text-[#4ADE80]',
    warning: 'text-[#FBBF24]',
    error: 'text-[#F87171]',
    border: 'border-[#3D3D42]',
    
    // Structural
    font: 'font-sans',
    radius: 'rounded-2xl',
    borderWidth: 'border',
    borderColor: 'border-[#3D3D42]',
    shadow: 'sunset-shadow',
    inputBg: 'bg-[#252528]',
    
    // Layout specifics
    sidebarBorder: 'border-r border-[#3D3D42]',
    headerBorder: 'border-b border-[#3D3D42]',
    card: 'bg-[#2D2D32]/90 backdrop-blur-xl border border-[#3D3D42] shadow-xl',
    button: 'rounded-2xl font-medium transition-all hover:shadow-lg hover:shadow-orange-500/10'
  }
};

export const TRANSLATIONS = {
  en: {
    newChat: 'New Chat',
    history: 'History',
    configLlms: 'Config LLMs',
    send: 'SEND',
    stop: 'STOP',
    currentChatModel: 'CURRENT CHAT MODEL',
    noChatModels: 'No Chat Models Configured',
    typeMessage: 'Type a message...',
    theme: 'Theme',
    language: 'Language',
    generating: 'GENERATING...',
    deleteSessionTitle: 'DELETE SESSION?',
    deleteSessionConfirm: 'Are you sure you want to delete this session?',
    deleteSessionDesc: 'This action cannot be undone.',
    deleteAction: 'DELETE',
    cancel: 'CANCEL',
    confirm: 'CONFIRM',
    close: 'CLOSE',
    saveFailed: 'Operation Failed',
    saved: 'Saved',
    providers: 'PROVIDERS',
    models: 'MODELS',
    addProvider: 'ADD PROVIDER',
    editProvider: 'EDIT PROVIDER',
    saveProvider: 'SAVE PROVIDER',
    updateProvider: 'UPDATE PROVIDER',
    deleteProviderConfirm: 'Delete this provider and all its models?',
    addModel: 'ADD MODEL',
    editModel: 'EDIT MODEL',
    deleteModelConfirm: 'Delete this model?',
    testConnection: 'TEST CONNECT',
    testModel: 'TEST MODEL',
    testing: 'TESTING...',
    connectionSuccess: 'Connection Successful',
    connectionFailed: 'Connection Failed',
    latency: 'Latency',
    name: 'NAME',
    type: 'TYPE',
    apiBaseUrl: 'API BASE URL',
    apiKey: 'API KEY',
    displayName: 'DISPLAY NAME',
    modelId: 'MODEL ID',
    context: 'CTX LEN',
    maxOutput: 'MAX OUT',
    temp: 'TEMP',
    dimensions: 'DIMENSIONS',
    setAsDefault: 'SET AS DEFAULT',
    selectProvider: 'Select Provider',
    selectModel: 'Select Model',
    llmConfig: 'LLM CONFIGURATION',
    themeDay: 'DAY MODE',
    themeNight: 'NIGHT MODE',
    themeShadcnDay: 'SHADCN LIGHT',
    themeShadcnNight: 'SHADCN DARK',
    themeCyber: 'CYBER NEON',
    themeSunset: 'SUNSET GLOW',
    changeTheme: 'Change Theme',
    changeLanguage: 'Change Language',
    searchPlaceholder: 'Search messages...',
    noMessagesFound: 'No messages found.',
    selectModelStart: 'Select a model to start.',
    online: 'ONLINE',
    deepThinking: 'Deep Thinking',
    thinkingProcess: 'Thinking Process',
    interrupted: 'Interrupted by user.',
    default: 'DEFAULT',
    noModelsConfigured: 'No models configured. Please add a provider and model.',
    uploadImage: 'Upload Image',
    noModelSelected: 'No Model Selected',
    
    // MCP Translations
    mcp: 'MCP SERVERS',
    mcpDesc: 'Manage Model Context Protocol servers and tools.',
    mcpServers: 'SERVERS',
    addServer: 'ADD SERVER',
    serverStatus: 'STATUS',
    tools: 'TOOLS',
    command: 'COMMAND',
    args: 'ARGS (comma separated)',
    envVars: 'ENV VARIABLES (JSON)',
    restart: 'RESTART',
    running: 'RUNNING',
    stopped: 'STOPPED',
    error: 'ERROR',
    mcpStats: 'MCP SYSTEM STATS',
    uptime: 'UPTIME',
    totalTools: 'TOTAL TOOLS',
    configSaved: 'CONFIG SAVED',
    saveConfig: 'SAVE CONFIG'
  },
  zh: {
    newChat: '新对话',
    history: '历史记录',
    configLlms: '配置模型',
    send: '发送',
    stop: '停止',
    currentChatModel: '当前对话模型',
    noChatModels: '未配置对话模型',
    typeMessage: '输入消息...',
    theme: '主题',
    language: '语言',
    generating: '生成中...',
    deleteSessionTitle: '删除会话?',
    deleteSessionConfirm: '确定要删除此会话吗？',
    deleteSessionDesc: '此操作无法撤销。',
    deleteAction: '删除',
    cancel: '取消',
    confirm: '确认',
    close: '关闭',
    saveFailed: '操作失败',
    saved: '已保存',
    providers: '服务商',
    models: '模型列表',
    aceAgent: 'ACE 代理',
    addProvider: '添加服务商',
    editProvider: '编辑服务商',
    saveProvider: '保存服务商',
    updateProvider: '更新服务商',
    deleteProviderConfirm: '删除此服务商及其所有模型？',
    addModel: '添加模型',
    editModel: '编辑模型',
    deleteModelConfirm: '删除此模型？',
    testConnection: '测试连接',
    testModel: '测试模型',
    testing: '测试中...',
    connectionSuccess: '连接成功',
    connectionFailed: '连接失败',
    latency: '延迟',
    name: '名称',
    type: '类型',
    apiBaseUrl: 'API 地址',
    apiKey: 'API 密钥',
    displayName: '显示名称',
    modelId: '模型 ID',
    context: '上下文长度',
    maxOutput: '最大输出',
    temp: '温度',
    dimensions: '维度',
    setAsDefault: '设为默认',
    selectProvider: '选择服务商',
    selectModel: '选择模型',
    llmConfig: '配置',
    themeDay: '日间模式',
    themeNight: '夜间模式',
    themeShadcnDay: 'Shadcn 浅色',
    themeShadcnNight: 'Shadcn 深色',
    themeCyber: '赛博霓虹',
    themeSunset: '落日余晖',
    changeTheme: '切换主题',
    changeLanguage: '切换语言',
    searchPlaceholder: '搜索消息...',
    noMessagesFound: '未找到消息。',
    selectModelStart: '选择一个模型开始。',
    online: '在线',
    deepThinking: '深度思考',
    thinkingProcess: '思考过程',
    interrupted: '用户已中断。',
    default: '默认',
    noModelsConfigured: '未配置模型。请添加服务商和模型。',
    uploadImage: '上传图片',
    noModelSelected: '未选择模型',
    
    // MCP Translations
    mcp: 'MCP 服务器',
    mcpDesc: '管理 Model Context Protocol 服务器与工具。',
    mcpServers: '服务器列表',
    addServer: '添加服务器',
    serverStatus: '状态',
    tools: '工具',
    command: '启动命令',
    args: '参数 (逗号分隔)',
    envVars: '环境变量 (JSON)',
    restart: '重启',
    running: '运行中',
    stopped: '已停止',
    error: '错误',
    mcpStats: 'MCP 系统统计',
    uptime: '运行时间',
    totalTools: '工具总数',
    configSaved: '配置已保存',
    saveConfig: '保存配置'
  },
  ja: {
    newChat: '新規チャット',
    history: '履歴',
    configLlms: 'LLM設定',
    send: '送信',
    stop: '停止',
    currentChatModel: '現在のモデル',
    noChatModels: 'モデル未設定',
    typeMessage: 'メッセージを入力...',
    theme: 'テーマ',
    language: '言語',
    generating: '生成中...',
    deleteSessionTitle: 'セッション削除?',
    deleteSessionConfirm: '本当に削除しますか？',
    deleteSessionDesc: 'この操作は取り消せません。',
    deleteAction: '削除',
    cancel: 'キャンセル',
    confirm: '確認',
    close: '閉じる',
    saveFailed: '操作失敗',
    saved: '保存しました',
    providers: 'プロバイダー',
    models: 'モデル',
    aceAgent: 'ACE エージェント',
    addProvider: 'プロバイダー追加',
    editProvider: 'プロバイダー編集',
    saveProvider: '保存',
    updateProvider: '更新',
    deleteProviderConfirm: 'このプロバイダーと全モデルを削除しますか？',
    addModel: 'モデル追加',
    editModel: 'モデル編集',
    deleteModelConfirm: 'このモデルを削除しますか？',
    testConnection: '接続テスト',
    testModel: 'モデルテスト',
    testing: 'テスト中...',
    connectionSuccess: '接続成功',
    connectionFailed: '接続失敗',
    latency: 'レイテンシ',
    name: '名前',
    type: 'タイプ',
    apiBaseUrl: 'API URL',
    apiKey: 'API キー',
    displayName: '表示名',
    modelId: 'モデル ID',
    context: 'コンテキスト長',
    maxOutput: '最大出力',
    temp: '温度',
    dimensions: '次元',
    setAsDefault: 'デフォルトに設定',
    selectProvider: 'プロバイダー選択',
    selectModel: 'モデル選択',
    llmConfig: 'LLM 設定',
    themeDay: 'デイモード',
    themeNight: 'ナイトモード',
    themeShadcnDay: 'Shadcn ライト',
    themeShadcnNight: 'Shadcn ダーク',
    themeCyber: 'サイバー NEON',
    themeSunset: 'サンセット グロー',
    changeTheme: 'テーマ変更',
    changeLanguage: '言語変更',
    searchPlaceholder: 'メッセージ検索...',
    noMessagesFound: 'メッセージが見つかりません。',
    selectModelStart: 'モデルを選択して開始。',
    online: 'オンライン',
    deepThinking: '深い思考',
    thinkingProcess: '思考プロセス',
    interrupted: 'ユーザーによって中断されました。',
    default: 'デフォルト',
    noModelsConfigured: 'モデルが設定されていません。プロバイダーとモデルを追加してください。',
    uploadImage: '画像アップロード',
    noModelSelected: 'モデル未選択',
    
    // MCP Translations
    mcp: 'MCP サーバー',
    mcpDesc: 'Model Context Protocol サーバーとツールの管理。',
    mcpServers: 'サーバー一覧',
    addServer: 'サーバー追加',
    serverStatus: 'ステータス',
    tools: 'ツール',
    command: '起動コマンド',
    args: '引数 (カンマ区切り)',
    envVars: '環境変数 (JSON)',
    restart: '再起動',
    running: '実行中',
    stopped: '停止',
    error: 'エラー',
    mcpStats: 'MCP システム統計',
    uptime: '稼働時間',
    totalTools: 'ツール総数',
    configSaved: '設定保存済み',
    saveConfig: '設定を保存'
  }
};

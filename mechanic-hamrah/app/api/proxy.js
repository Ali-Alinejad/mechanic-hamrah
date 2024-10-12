
import { createProxyMiddleware } from "http-proxy-middleware";

export default createProxyMiddleware({
  target: "https://api.neshan.org",
  changeOrigin: true,
  pathRewrite: {
    "^/api/proxy": "/v1", 
  },
  onProxyReq: (proxyReq, req, res) => {
    // اضافه کردن هدر Api-Key
    proxyReq.setHeader("Api-Key", "web.e27fb33bea394b0c81f058ad18481f53"); // 
  },
});

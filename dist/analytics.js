const o = "development", r = () => typeof window > "u" ? !1 : window.gtag ? !0 : (process.env.NODE_ENV === o && console.warn(
  "It looks like GTAG is not (properly) installed... https://support.google.com/analytics/answer/9304153?hl=en#zippy=%2Cweb%2Cadd-the-google-tag-directly-to-your-web-pages"
), !1);
var s = /* @__PURE__ */ ((e) => (e.CLICK = "click", e))(s || {});
const a = (e, t) => {
  if (!r())
    return;
  const n = window.gtag;
  n("event", e, t);
};
export {
  s as EventTypes,
  a as pushTrackingEvent
};

import * as En from "./en";
import * as ZhHant from "./zh-Hant";
const data = {
  en: En,
  "zh-Hant": ZhHant,
  getData: (lang :string | string[]) => {
    return (lang=="en" || lang=="zh-Hant") ? data[lang]: data.en;
  }
}
export default data;
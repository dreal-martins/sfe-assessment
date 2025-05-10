import { Select } from "antd";
import i18n from "../../i18n";
import { languageOptions } from "../../constants/language-selector";

const LanguageSelector = () => {
  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      defaultValue={"Language"}
      style={{ width: 100 }}
      onChange={handleChange}
      options={languageOptions}
      optionLabelProp="label"
      className="custom-select"
    />
  );
};

export default LanguageSelector;

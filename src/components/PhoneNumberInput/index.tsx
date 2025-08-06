import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./style.css";
const PhoneNumberInput = () => {
  const [phone, setPhone] = useState<string>("");
  return (
    <div className="w-[170px]">
      <PhoneInput
        country="us"
        value={phone}
        onChange={(phone) => setPhone(phone)}
      />
    </div>
  );
};

export default PhoneNumberInput;

import { HeaderRegistration } from "./HeaderRegistration/HeaderRegistration";
import { BackgroundRegistration } from "./BackgroundRegistration/BackgroundRegistration";
import { FormRegistration } from "./FormRegistration/FormRegistration";

export function Registration() {
  return (
    <div>
    <BackgroundRegistration />
    <HeaderRegistration />
    <FormRegistration />
    </div>
    
  );
}

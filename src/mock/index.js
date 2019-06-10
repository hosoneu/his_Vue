import common from './common'
import doctor from "./doctor";
import register from './register'
import basicInfo from "./basicInfo";
import tech from "./tech"
import pharmacy from "./pharmacy";

export default function () {
  common();
  doctor();
  register();
  basicInfo();
  tech();
  pharmacy();
}

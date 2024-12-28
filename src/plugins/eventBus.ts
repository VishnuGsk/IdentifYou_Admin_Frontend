// @ts-ignore
import mitt from "mitt";
type Events = {
  program: Object;
};

const EventBus = mitt<Events>();
export default EventBus;

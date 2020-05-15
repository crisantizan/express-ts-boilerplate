import controllers from './register-controllers';
import { ControllerRouteProps } from '@/typings/shared.typing';

/** extract only route props */
function getRouters(controllers: any): ControllerRouteProps[] {
  return controllers.map((Controller: any) => {
    const instance: ControllerRouteProps = new Controller();

    // route name and router
    return { route: instance.route, router: instance.router };
  });
}

export default getRouters(controllers);

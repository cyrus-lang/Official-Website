import { MotionProps } from "motion/react";
import * as motion from "motion/react-client";
import {
  ElementType,
  ReactNode,
  forwardRef,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
} from "react";

type MotionComponentProps<T extends keyof typeof motion> = {
  type?: T;
  children?: ReactNode;
} & MotionProps &
  ComponentPropsWithoutRef<T extends keyof JSX.IntrinsicElements ? T : "div">;

export const Motion = <T extends keyof typeof motion = "div">(
  props: MotionComponentProps<T>,
  ref: React.Ref<
    ComponentPropsWithRef<
      T extends keyof JSX.IntrinsicElements ? T : "div"
    >["ref"]
  >
) => {
  const { type = "div", children, ...rest } = props;
  const Component: ElementType = motion[type];
  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
};

export const ForwardedMotion = forwardRef(Motion) as <T extends keyof typeof motion = "div">(
  props: MotionComponentProps<T> & {
    ref?: React.Ref<
      ComponentPropsWithRef<
        T extends keyof JSX.IntrinsicElements ? T : "div"
      >["ref"]
    >;
  }
) => JSX.Element;

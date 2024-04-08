import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./MessageModal.scss";
import { MessageModalType } from ".";
import { createPortal } from "react-dom";
const MessageModal = forwardRef<MessageModalType>(
  (props, ref: Ref<MessageModalType>) => {
    const [isShow, setIsShow] = useState(false);
    const [message, setMessage] = useState("");
    const containerElemRef = useRef(document.createElement("div"));
    const containerElem = containerElemRef.current;
    useImperativeHandle(
      ref,
      () => {
        return {
          // 用于在父组件中控制当前组件内容的展示和隐藏
          showModal(message: string) {
            setMessage(message);
            if (!isShow) setIsShow(true);
          },
        };
      },
      [],
    );
    // 2s后自动关闭
    useEffect(() => {
      const timer = setTimeout(() => {
        setMessage("");
        setIsShow(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }, [isShow]);

    // 将messageModal传送到body上
    useEffect(() => {
      if (isShow) {
        // 挂载
        document.body.appendChild(containerElem);
      } else {
        // 卸载
        if (containerElem.parentNode) {
          containerElem.parentNode.removeChild(containerElem);
        }
      }
      return () => {
        if (containerElem.parentNode) {
          containerElem.parentNode.removeChild(containerElem);
        }
      };
    }, [isShow, containerElem]);

    return createPortal(
      <div className="message-modal">{message}</div>,
      containerElem,
    );
  },
);

export default MessageModal;

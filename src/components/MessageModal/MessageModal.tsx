import {
  forwardRef,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import "./MessageModal.scss";
import { MessageModalType } from ".";
const MessageModal = forwardRef<MessageModalType>(
  (props, ref: Ref<MessageModalType>) => {
    const [isShow, setIsShow] = useState(false);
    const [message, setMessage] = useState("");
    useImperativeHandle(
      ref,
      () => {
        return {
          // 用于在父组件中控制当前组件内容的展示和隐藏
          showModal(message: string) {
            setMessage(message);
            setIsShow(true);
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

    return isShow ? <div className="message-modal">{message}</div> : null;
  },
);

export default MessageModal;

import "./fullModal.scss";
import loadingPic from "@assets/imgs/loading.gif";
export default function FullModal() {
  return (
    <div className="full-modal">
      <img src={loadingPic} alt="loading" className="loading-pic" />
    </div>
  );
}

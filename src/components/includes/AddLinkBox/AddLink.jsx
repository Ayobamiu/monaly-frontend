import React, { useState } from "react";
import bin from "../../../assets/images/bin.svg";
import Edit from "../../../assets/images/Edit.svg";
import Calandar from "../../../assets/images/Calandar.svg";
import gallery from "../../../assets/images/gallery.svg";
import Heart from "../../../assets/images/Heart.svg";
import "./css/style.css";
import { updateCustomLink } from "../../../store/customLinkSlice";
import { useDispatch } from "react-redux";

const AddLinkBox = ({
  title,
  link,
  visible,
  _id,
  onChangeLink,
  onChangeTitle,
  onChangeSwitch,
  onClickDelete,
  hideDeleteAndSwitch,
  onChangeImage,
}) => {
  const [checkedStatus, setCheckedStatus] = useState(visible);
  const dispatch = useDispatch();
  const itemId = _id;
  return (
    <div className={`add-link-box  ${!checkedStatus && `opaque`}`} id={_id}>
      <div className="inputs-and-media space-between flex-column">
        <div>
          <div className="text-icon custom-p fsz-14-900">
            <input
              type="text"
              placeholder={title || "Title"}
              style={{ fontWeight: "bold" }}
              id={`titleinput${_id}`}
              defaultValue={title}
              onChange={(e) => onChangeTitle(e.target.value)}
            />
            <img
              src={Edit}
              alt=""
              onClick={() => {
                document.getElementById(`titleinput${_id}`).focus();
              }}
              title="Edit Title"
            />
          </div>
          <div className="text-icon custom-p fsz-14-900">
            <input
              type="text"
              placeholder={link || "Paste link here"}
              id={`linkinput${_id}`}
              defaultValue={link}
              onChange={(e) => onChangeLink(e.target.value)}
            />
            <img
              src={Edit}
              alt=""
              onClick={() => {
                document.getElementById(`linkinput${_id}`).focus();
              }}
              title="Edit Link"
            />
          </div>
        </div>
        <div className="align-end">
          <img className="mr-16" src={Calandar} alt="" title="Schedule" />
          <label htmlFor="link-image" className="align-end mb-0">
            <input
              type="file"
              name="image"
              id="link-image"
              onChange={(e) => {
                // e.preventDefault();
                console.log("input", itemId, e.target.files[0]);
                const newFormData = new FormData();
                newFormData.append("image", e.target.files[0]);
                onChangeImage(newFormData);
              }}
            />
            <img
              className="mr-16"
              src={gallery}
              alt=""
              title="Add media"
              onClick={() => {
                console.log("p", itemId);
              }}
            />
          </label>
          <img className="mr-16" src={Heart} alt="" title="Favourite" />
        </div>
      </div>
      <div className="switch-and-delete">
        <div class="form-check form-switch form-switch-lg">
          <input
            class="form-check-input custom-switch"
            type="checkbox"
            id={`checkbox${_id}`}
            onChange={(e) => {
              setCheckedStatus(e.target.checked);
              onChangeSwitch(e.target.checked ? "true" : "false");
            }}
            title="Toggle Visibility"
            checked={checkedStatus}
          />
        </div>
        <img src={bin} alt="" title="Delete" onClick={(e) => onClickDelete()} />
      </div>
    </div>
  );
};

export default AddLinkBox;

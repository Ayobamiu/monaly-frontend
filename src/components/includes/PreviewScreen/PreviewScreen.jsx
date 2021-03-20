import React from "react";
import { useDispatch } from "react-redux";
import {
  removecustomLink,
  updateCustomLink,
} from "../../../store/customLinkSlice";
import AddLinkBox from "../AddLinkBox/AddLink";

const PreviewScreen = ({ data }) => {
  const dispatch = useDispatch();
  return (
    <div>
      {data.map((customLink) => (
        <AddLinkBox
          title={customLink.title}
          _id={customLink._id}
          link={customLink.link}
          visible={customLink.visible}
          onClickDelete={() => dispatch(removecustomLink(customLink._id))}
          onChangeTitle={(text) =>
            dispatch(updateCustomLink(customLink._id, { title: text }))
          }
          onChangeLink={(text) =>
            dispatch(updateCustomLink(customLink._id, { link: text }))
          }
          onChangeSwitch={
            (text) =>
              dispatch(updateCustomLink(customLink._id, { visible: text }))
            // console.log(text)
          }
          key={customLink._id}
        />
      ))}
    </div>
  );
};

export default PreviewScreen;

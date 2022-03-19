import { dbService, storageService } from "fBase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import React, { useState } from "react";

function Hweet({ hweetObj, isOwner }) {
  const [editing, setEditing] = useState(false);
  const [newHweet, setNewHweet] = useState(hweetObj.text);
  const NweetTextRef = doc(dbService, "hweets", `${hweetObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this hweet?");
    /* if (ok) {
      await dbService.doc(`hweets/${hweetObj.id}`).delete();
    } */
    if (ok) {
      // doc("컬렉션 이름", "문서 이름")
      await deleteDoc(NweetTextRef);
      if (hweetObj.attachmentUrl) {
        await deleteObject(ref(storageService, hweetObj.attachmentUrl));
      }
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    /* await dbService.doc(`hweets/${hweetObj.id}`).update({
      text: newHweet,
    }); */
    // updataDoc(선택한 컬렉션의 문서 이름과 내용, {수정할 부분})
    await updateDoc(NweetTextRef, {
      text: newHweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewHweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your hweet"
              value={newHweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Hweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{hweetObj.text}</h4>
          {hweetObj.attachmentUrl && (
            <img src={hweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Hweet;

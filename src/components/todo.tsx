import React, { useState } from "react";
import { useGetAllTodos } from "../api";
import Button from "./button";
import * as fi from "react-icons/fi";
interface Props {
  title?: string;
  desc?: string;
  status?: boolean;
  key?: any;
  id?: string;
  onComplete?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isUpdate?: boolean;
}
const Todos = (props: Props) => {
  const [update, setUpdate] = useState(false);

  return (
    // flex justify-between
    <div className="grid grid-cols-8 items-center border-y border-gray-400 p-2 justify-center">
      <div className="col-span-6">
        <h1 className="text-base font-medium">{props.title}</h1>
        <p>{props.desc}</p>
      </div>
      <div className="">
        {props.isUpdate ? (
          <div className="statload flex justify-center ">Loading</div>
        ) : (
          <div
            className={`text-lg ${
              props.status ? "text-green-500" : "text-orange-500"
            }`}
          >
            {props.status ? "Complete" : "Pending"}
          </div>
        )}
      </div>

      <div className="flex gap-3 ">
        <Button
          icon={<fi.FiCheckCircle />}
          classname="text-green-600 hover:text-green-700"
          onClick={props.onComplete}
        />
        <Button
          icon={<fi.FiEdit2 />}
          classname="text-blue-500 hover:text-blue-700"
          onClick={props.onEdit}
        />
        <Button
          icon={<fi.FiTrash2 />}
          classname="text-red-500 hover:text-red-700"
          onClick={props.onDelete}
        />
      </div>
    </div>
  );
};

export default Todos;

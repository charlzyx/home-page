import type { Action, Handler } from "src/types/next-handler";
import type { Service, ServiceGroup } from "src/types/services";

import { generatorRespError } from "src/utils/handler";
import {
  editServiceGroup,
  addServiceGroup,
  addServicesData,
  deleteServiceGroup,
  deleteServicesData,
  editServiceData,
  updateServiceData,
} from "src/utils/services";

const addGroupHandler: Handler = async (req, res) => {
  const data = JSON.parse(req.body);

  if (!data?.name) {
    res.status(400).json(generatorRespError("分组名不能为空"));
    return;
  }

  try {
    await addServiceGroup(data);
    res.status(200).json({ msg: `添加分组 ${data.name}成功` });
  } catch {
    res.status(500).json(generatorRespError("服务器错误"));
  }
};

const deleteGroupHandler: Handler = async (req, res) => {
  const data = req.body;

  if (!data) {
    res.status(400).json(generatorRespError("分组名不能为空"));
    return;
  }

  try {
    await deleteServiceGroup(data);
    res.status(200).json({ msg: `添加分组 ${data.name}成功` });
  } catch {
    res.status(500).json(generatorRespError("服务器错误"));
  }
};

const editGroupHandler: Handler = async (req, res) => {
  const data = JSON.parse(req.body) as ServiceGroup & { oldGroupName: string };

  if (!data.oldGroupName) {
    res.status(400).json(generatorRespError("分组名不能为空"));
    return;
  }

  try {
    await editServiceGroup(data);
    res.status(200).json({ msg: `编辑分组 ${data.name}成功` });
  } catch {
    res.status(500).json(generatorRespError("服务器错误"));
  }
};

const addHandler: Handler = async (req, res) => {
  const data = JSON.parse(req.body) as
    | (Service & { groupName: string })
    | undefined;

  if (!data) {
    res.status(400).json(generatorRespError("数据不能为空"));
    return;
  }

  try {
    await addServicesData(data);
    res.status(200).json({ msg: `添加 ${data.name} 成功` });
  } catch {
    res.status(500).json(generatorRespError("服务器错误"));
  }
};

const deleteHandler: Handler = async (req, res) => {
  const { targetName, groupName } = JSON.parse(req.body) || {};

  if (!targetName || !groupName) {
    res.status(400).json(generatorRespError("删除的目标卡片或所属分组名为空"));
    return;
  }

  try {
    await deleteServicesData(targetName, groupName);
    res.status(200).json({ msg: `删除 ${groupName}/${targetName} 成功` });
  } catch {
    res.status(500).json(generatorRespError("服务器错误"));
  }
};

const editHandler: Handler = async (req, res) => {
  const data = JSON.parse(req.body) as
    | (Service & { oldName: string; groupName: string })
    | undefined;

  if (!data) {
    res.status(400).json(generatorRespError("数据不能为空"));
    return;
  }

  try {
    await editServiceData(data);
    res
      .status(200)
      .json({ msg: `编辑 ${data.groupName}/${data.oldName} 成功` });
  } catch {
    res.status(500).json(generatorRespError("服务器错误"));
  }
};

const updateHandler: Handler = async (req, res) => {
  const data = JSON.parse(req.body) as ServiceGroup[] | undefined;

  if (!data) {
    res.status(400).json(generatorRespError("数据不能为空"));
    return;
  }

  try {
    await updateServiceData(data);
    res.status(200).json({ msg: "更新成功" });
  } catch (e: any) {
    res
      .status(500)
      .json(generatorRespError(`服务器错误 ${e.mssage} || ${e.stack}`));
  }
};

const handler: Handler = async (req, res) => {
  res.status(401).json(generatorRespError(`not supported`));
  return;
};

const to_disabled_handler: Handler = (req, res) => {
  if (req.method !== "POST") {
    res
      .status(405)
      .json(generatorRespError(`请求方法 ${req.method ?? ""} 不支持`));
    return;
  }

  const action = req.query.action as Action;
  switch (action) {
    case "addgroup":
      addGroupHandler(req, res);
      break;
    case "deletegroup":
      deleteGroupHandler(req, res);
      break;
    case "editgroup":
      editGroupHandler(req, res);
      break;
    case "add":
      addHandler(req, res);
      break;
    case "delete":
      deleteHandler(req, res);
      break;
    case "edit":
      editHandler(req, res);
      break;
    case "update":
      updateHandler(req, res);
      break;
    default:
      res.status(400).json(generatorRespError("未知操作"));
  }
};

export default handler;

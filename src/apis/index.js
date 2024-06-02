import axios from '~/axios';
import { API_ROOT } from '~/utils/constants';

// Board
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  // console.log(response)
  return response;
};

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updateData
  );
  // console.log(response)
  return response;
};
export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updateData
  );
  // console.log(response)
  return response;
};

// Column
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData);
  // console.log(response)
  return response;
};

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updateData
  );
  // console.log(response)
  return response;
};

export const deleteColumnDetailsAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`);
  // console.log(response)
  return response;
};

//Card
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData);
  // console.log(response)
  return response;
};

export const testLoginGG = async () => {
  const response = await axios.get(`${API_ROOT}/v1/auth/login/success`, {
    withCredentials: true,
  });
  return response;
};

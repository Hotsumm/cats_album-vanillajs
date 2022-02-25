const BASE_URL = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com';

export const fetchRoot = async () => {
  try {
    const res = await fetch(`${BASE_URL}/dev`, { method: 'GET' });

    if (!res.ok) throw new Error('데이터를 받아오는데 실패 하였습니다');

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const fetchNodes = async (nodeId) => {
  try {
    const res = await fetch(`${BASE_URL}/dev/${nodeId}`, { method: 'GET' });

    if (!res.ok) throw new Error('데이터를 받아오는데 실패 하였습니다');

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

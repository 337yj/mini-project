export const fetchSectionListData = async () => {
  try {
    const response = await fetch("public/mock/videoListData.json");
    const data = await response.json();
    return data?.videoInfoList || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

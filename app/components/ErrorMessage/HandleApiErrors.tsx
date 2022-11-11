import ErrorMessage from ".";

export const handleApiError = async (error: any) => {
console.log('error ===>: ', error);
    switch (error?.response?.status) {
      case 401:
        ErrorMessage({
          msg: error?.response?.data?.message,
        })
        break;
      case 403:
        ErrorMessage({
          msg: error?.response?.data?.message,
        })
        break;
      case 500:
        ErrorMessage({
          msg: error?.response?.data?.message,
        })
      case 400:
        ErrorMessage({
          msg: error?.response?.data?.message,
        })
        break;
    }
  };
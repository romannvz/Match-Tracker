const URL = 'https://app.ftoyd.com/fronttemp-service';

export const getApi = () =>
  fetch(`${URL}/fronttemp`)
    .then((res) => {
      if (res.ok) {
        return res.json().then((data) => Promise.resolve(data));
      } else res.json().then((err) => Promise.reject(err));
    })
    .then((data) => data);

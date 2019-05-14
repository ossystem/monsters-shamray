import { get, post } from 'utils/request';
import { API_URL } from '../../constants';

function getQuestionerConfig(accessToken) {
  return get(accessToken, `${API_URL}/questionerConfig`);
}

function saveAnswers(accessToken, data) {
  return post(accessToken, `${API_URL}/saveAnswers`, data);
}

export default { getQuestionerConfig, saveAnswers };

module.exports = function(questionerConfig, answers) {
  const { steps: questions } = questionerConfig;
  const props = [];
  answers.forEach((answer, index) => {
    const { appearance, options } = questions[index];
    switch (appearance) {
      case 'radio':
      case 'switcher': {
        const option = options.find(opt => opt.value === answer);
        if (option) {
          props.push(option.name);
        }
        break;
      }
      case 'checkbox':
        Object.keys(answer).forEach(val => {
          const option = options.find(opt => opt.value === val);
          if (option) {
            props.push(option.name);
          }
        });
        break;
      case 'slider':
        props.push(answer > 50 ? options[1].name : options[0].name);
        break;
    }
  });
  return props.join('; ');
};

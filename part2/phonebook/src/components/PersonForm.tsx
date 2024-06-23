import React from 'react';

const PersonForm = ({
  onChangeName,
  valueNewName,
  onChangeNumber,
  valueNumber,
  ...props
}) => {
  return (
    <form {...props}>
      <div>
        name: <input onChange={onChangeName} value={valueNewName} />
      </div>
      <div>
        number: <input onChange={onChangeNumber} value={valueNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;

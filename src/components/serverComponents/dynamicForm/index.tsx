import React from 'react';

interface Props {
  action: () => Promise<void>;
}

const DynamicForm = ({ action }: Props) => {
  return (
    <form>

    </form>
  );
};

export default DynamicForm;
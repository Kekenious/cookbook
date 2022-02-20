import { Input } from 'reactstrap';

export function NewRecipeInput({ setValue, value, ...rest }) {
  return (
    <Input
      placeholder=""
      onChange={(event) => setValue(event.target.value)}
      {...rest}
    />
  );
}

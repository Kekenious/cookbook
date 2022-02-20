import { Input } from 'reactstrap';

export function SearchInput({ setValue, ...rest }) {
  return (
    <Input
      placeholder="Vyhledat recept..."
      onChange={(event) => setValue(event.target.value)}
      {...rest}
    />
  );
}

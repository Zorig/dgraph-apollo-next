const Header = ({ todo, handleChange, ...props }) => {
  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
          value={todo}
          onChange={handleChange}
          {...props}
        />
      </header>
    </div>
  );
};

export default Header;

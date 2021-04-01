export const TodoItem = ({
	todo: { completed, title },
	onToggle,
	onDestroy
}) => {
	return (
		<li className={completed ? "completed" : undefined}>
			<div className="view">
				<input
					className="toggle"
					type="checkbox"
					checked={completed}
					onChange={onToggle}
				/>
				<label>{title}</label>
				<button className="destroy" onClick={onDestroy} />
			</div>
		</li>
	);
};

export default TodoItem;

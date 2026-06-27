import TodoItem from "./TodoItem";

function TodoList(props) {
    const {
        tasks = [],
        filteredTasks,
        onDeleteTaskButtonClick,
        onTaskCompleteChange,
    } = props

    const hasTasks = tasks.length > 0
    const isEmptyFilteredTasks = filteredTasks?.length === 0

    if (!hasTasks) {
        return <div className="todo__empty-message"><p> Нету задач в списке! </p></div>
    }
    if (hasTasks && isEmptyFilteredTasks) {
        return <div className="todo__empty-message"><p> Задачи по поиску не найдены </p></div>
    }
    return (
        <ul className="todo__list">
            {(filteredTasks ?? tasks).map((task) => (
                <TodoItem
                    className = "todo__item"
                    key = {task.id}
                    {...task}
                    onDeleteTaskButtonClick = {onDeleteTaskButtonClick}
                    onTaskCompleteChange = {onTaskCompleteChange}
                />
            ))}
        </ul>
    )
}
export default TodoList;
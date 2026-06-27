import Field from "./Field";

function SearchTaskForm(props) {
    const {
        searchQuery,
        setSearchQuery,
    } = props
    return (
        <form className="todo__form" onSubmit={(event) => event.preventDefault()}>
            <div className="todo__field field">
                <label
                    className="field__label"
                    htmlFor="search-task"
                >
                    Search task
                </label>
                <Field 
                    className="todo__field"
                    label="Search task"
                    id="search-task"
                    type="search"
                    value={searchQuery}
                    onInput={(event) => setSearchQuery(event.target.value)}
                />
            </div>
        </form>
    );
}
export default SearchTaskForm;
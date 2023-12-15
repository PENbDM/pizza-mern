const Categories = ({ value, onClickCategory }) => {
  // console.log(value);

  const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <>
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={value === index ? "active" : ""}
            >
              {categoryName}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
};
export default Categories;

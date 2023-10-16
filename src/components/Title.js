import React from "react";

const styles = (color, width) => ({
  container: {
    padding: 20,
    width: width,
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: color,
    boxSizing: "border-box",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 100,
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
  },
});

const Title = ({ subtitle, title, color = "#171a2b", width = 500 }) => {
  const style = styles(color, width);

  return (
    <p style={style.container}>
      <span style={style.subtitle}>{subtitle}</span>
      <span style={style.title}>{title}</span>
    </p>
  );
};

export default Title;

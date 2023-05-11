const joinClasses = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export { joinClasses };

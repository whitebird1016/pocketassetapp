export default (props) => (
  <svg 
    id="trash"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}>
    <path
      d="M17.7958 5L16.8807 17.1425C16.8018 18.1891 15.883 19 14.7759 19H6.04431C4.93721 19 4.01834 18.1891 3.93946 17.1425L3.02434 5M8.29987 9V15M12.5203 9V15M13.5754 5V2C13.5754 1.44772 13.103 1 12.5203 1H8.29987C7.71715 1 7.24477 1.44772 7.24477 2V5M1.96924 5H18.8509"
      stroke={props?.pathColor?props.pathColor:"#111827"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

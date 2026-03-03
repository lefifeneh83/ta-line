import logo from "../assets/ta-line-logo.svg";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Ta-line Logo" style={styles.logo} />
        <span style={styles.title}>Ta-line</span>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#111",
    color: "white"
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  logo: {
    width: "40px",
    height: "40px"
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold"
  }
};

export default Navbar;

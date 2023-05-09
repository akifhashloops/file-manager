import Pagination from "react-bootstrap/Pagination";
const Index = ({ characters, currentPage, setCurrentPage }) => {
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handlePreviousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    const totalPages = Object.keys(characters).length;
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="w-100 d-flex justify-content-center my-3">
      <Pagination>
        <Pagination.Prev onClick={handlePreviousPage} />
        {Object.keys(characters).map((page) => (
          <Pagination.Item key={page} active={parseInt(page) === currentPage} onClick={() => handlePageChange(parseInt(page))}>
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={handleNextPage} />
      </Pagination>
    </div>
  );
};

export default Index;

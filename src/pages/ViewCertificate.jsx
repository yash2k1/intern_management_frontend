import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Ui/Navbar";
import Footer from "../Components/Ui/Footer";
import { toast } from "react-hot-toast";
import axios from "axios";

const ViewCertificate = () => {
  const { certId } = useParams(); // route param like /certificate/:certId
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [certificateId, setCertificateId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/certificate/${certId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Use the exact keys returned by your backend
        setCertificateUrl(res.data.fileUrl || "");
        setCertificateId(res.data._id || "");
      } catch (err) {
        const msg = err.response?.data?.message || err.message;
        toast.error(msg, {
          style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
          icon: "❌",
        });
      } finally {
        setLoading(false);
      }
    };

    if (certId) {
      fetchCertificate();
    } else {
      setLoading(false);
      toast.error("No certificate ID provided");
    }
  }, [certId]);

  const handleDownload = () => {
    if (!certificateUrl) return;

    const link = document.createElement("a");
    link.href = certificateUrl;

    // Extract filename or fallback
    const filename = certificateUrl.split("/").pop() || "certificate";

    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col">
      <Navbar />
      <div className="max-w-4xl mx-auto py-8 px-4 flex-grow w-full text-center">
        <h2 className="text-2xl font-semibold mb-6">View Certificate</h2>

        {loading ? (
          <p>Loading certificate...</p>
        ) : certificateUrl ? (
          <>
            {certificateUrl.toLowerCase().endsWith(".pdf") ? (
              <iframe
                src={certificateUrl}
                title="Certificate PDF"
                className="w-full h-[600px] border rounded shadow-md"
              />
            ) : (
              <img
                src={certificateUrl}
                alt="Certificate"
                className="max-w-full max-h-[600px] mx-auto rounded shadow-md border"
              />
            )}

            <p className="mt-6 text-sm text-gray-700 dark:text-gray-300">
              <strong>Certificate ID:</strong> {certificateId}
            </p>

            <button
              onClick={handleDownload}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition"
              title="Download Certificate"
            >
              Download Certificate
            </button>
          </>
        ) : (
          <p>No certificate found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ViewCertificate;

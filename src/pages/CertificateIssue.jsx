import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Ui/Navbar";
import Footer from "../Components/Ui/Footer";
import MainButtons from "../Components/Ui/MainButtons";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import axios from "axios";
import certificatePreview from "../assets/certificatePreview.jpg";

const CertificateIssue = () => {
  const [certificateFile, setCertificateFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [issuedCertificate, setIssuedCertificate] = useState(null);

  const fileInputRef = useRef(null);

  const internId = new URLSearchParams(window.location.search).get("internId");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (!internId) {
      toast.error("Missing intern ID. Redirecting...", {
        style: { background: "#fee2e2", color: "#b91c1c", fontWeight: "bold" },
        icon: "❌",
      });
      setTimeout(() => navigate("/", { replace: true }), 1500);
      return;
    }

    fetchIssuedCertificate();
  }, [internId]);

  const fetchIssuedCertificate = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/certificate`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { internId },
      });

      const cert = res.data?.[0];
      if (cert) {
        const certDetails = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/certificate/${cert._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIssuedCertificate(certDetails.data);
        const fullUrl = getFullFileUrl(certDetails.data.fileUrl);
        setPreviewUrl(fullUrl);
      } else {
        setIssuedCertificate(null);
        setPreviewUrl(null);
      }
    } catch (error) {
      toast.error("Failed to fetch certificate");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setCertificateFile(null);
    setPreviewUrl(issuedCertificate ? getFullFileUrl(issuedCertificate.fileUrl) : null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!issuedCertificate?._id) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/certificate/${issuedCertificate._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Certificate deleted");
      setIssuedCertificate(null);
      setCertificateFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      toast.error("Failed to delete certificate");
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    if (!certificateFile) {
      toast.error("Please upload a certificate");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", certificateFile);
    formData.append("internId", internId);

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/certificate`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Certificate issued");
      setCertificateFile(null);
      fetchIssuedCertificate(); // Refresh
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to issue certificate");
    } finally {
      setSubmitting(false);
    }
  };

  const getFullFileUrl = (fileUrl) => {
    if (!fileUrl) return "";
    return `${import.meta.env.VITE_API_BASE_URL}/${fileUrl.replace(/^\/+/, "")}`;
  };

  const isPdf = (url) => url?.toLowerCase().endsWith(".pdf");

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6 flex-grow w-full">
        <h2 className="text-xl font-bold mb-4">Issue Certificate</h2>

        <div className="mb-6 border p-4 rounded bg-gray-50 dark:bg-gray-800 text-center">
          {previewUrl ? (
            isPdf(previewUrl) ? (
              <img
                src={certificatePreview}
                alt="PDF Placeholder"
                className="w-64 mx-auto rounded border"
              />
            ) : (
              <img
                src={previewUrl}
                alt="Certificate Preview"
                className="w-64 mx-auto rounded border"
              />
            )
          ) : (
            <img
              src={certificatePreview}
              alt="Fallback Preview"
              className="w-64 mx-auto rounded border"
            />
          )}

          {certificateFile && (
            <button
              onClick={handleCancel}
              className="mt-2 text-red-500 hover:underline text-sm cursor-pointer"
            >
              Cancel Upload
            </button>
          )}
        </div>

        {!issuedCertificate && (
          <>
            <div className="mb-6">
              <label className="block font-medium mb-2">Upload Certificate (PDF/Image)</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="w-full p-2 border rounded dark:bg-gray-700 cursor-pointer"
                ref={fileInputRef}
              />
            </div>
            <div className="flex gap-4">
              <MainButtons
                title={submitting ? "Submitting..." : "Submit Certificate"}
                onClick={handleSubmit}
                disabled={submitting}
              />
              <MainButtons title="Cancel" onClick={handleCancel} />
            </div>
          </>
        )}

        {issuedCertificate && (
          <div className="mt-4 flex gap-4">
            <MainButtons
              title="Delete Certificate"
              onClick={handleDelete}
              className="cursor-pointer px-4 py-2 rounded-full text-sm text-white font-medium shadow-md dark:hover:bg-primary transition-all bg-alert hover:bg-alert-light"
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CertificateIssue;

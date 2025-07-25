"use client";

import { Label } from "@/components/ui/label";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Camera,
  ScanLine,
  Flashlight,
  RotateCcw,
  CheckCircle,
  Upload,
  History,
  Settings,
} from "lucide-react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { toast } from "react-toastify";
import { BrowserQRCodeReader } from "@zxing/browser";
import { useNotificationModal } from "@/contexts/NotificationModalContext";
import { useTranslations } from "next-intl";

export default function ScanQRPage() {
  const t = useTranslations();
  const [isScanning, setIsScanning] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanResult, setScanResult] = useState<any | null>(null);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { showError } = useNotificationModal()

  // Request camera permission
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      setHasPermission(true);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsScanning(true);
    } catch (error) {
      setHasPermission(false);
      showError({
        title: "error_title",
        message: t("error_access_camera"),
        autoClose: true,
      });
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  // Handle file upload for QR code image
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = imageUrl;

    img.onload = async () => {
      try {
        const codeReader = new BrowserQRCodeReader();
        const result = await codeReader.decodeFromImageElement(img);
        setScanResult(result.getText());
      } catch (err) {
        toast("Không đọc được mã QR. Hãy thử ảnh khác.");
      }
    };
  };

  // Process scan result based on type
  const processScanResult = (input: any) => {};

  const onScanHanlde = (result: any) => {
    setScanResult(result[0].rawValue);
  };

  useEffect(() => {
    requestCameraPermission();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (scanResult) {
      processScanResult(scanResult);
    }
  }, [scanResult]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6 ">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Quét Mã QR</h1>
            <p className="text-muted-foreground">
              Quét mã QR để thanh toán hoặc nhận thông tin
            </p>
          </div>
        </div>

        <div className="gap-6">
          {/* Main Scanner */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center">
            <div>
              {!isScanning && (
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center space-y-4">
                  <Camera className="h-16 w-16 text-gray-400" />
                  <div className="text-center space-y-2">
                    <p className="font-medium">Chưa bắt đầu quét</p>
                    <p className="text-sm text-muted-foreground">
                      Chấp nhận quyền truy cập camera để quét mã QR
                    </p>
                  </div>
                </div>
              )}

              {isScanning && (
                <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
                  <Scanner onScan={onScanHanlde} />;{/* Scanning overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-2 border-white rounded-lg relative">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />

                      {/* Scanning line animation */}
                      <div
                        className="absolute top-0 left-0 w-full h-1 bg-primary animate-pulse"
                        style={{ animation: "scan 2s linear infinite" }}
                      />
                    </div>
                  </div>
                  {/* Controls overlay */}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-4">
                {!hasPermission && (
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={requestCameraPermission}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Cấp quyền
                  </Button>
                )}
                <>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Tải ảnh
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { defineProperties } from "figma:react";

// Komponen Utama (Presiden, MIO, Menko, Kementrian, KMI, Sekab)
const Box = ({ text, link }) => (
  <a href={link} className="z-10 flex flex-col justify-center items-center bg-gradient-to-b from-[#b35e1b] to-[#6e2b02] border-2 border-[#f3b177] rounded-full px-3 py-2.5 shadow-md text-white text-[11px] font-bold text-center w-[160px] cursor-pointer hover:bg-[#c97430] hover:scale-105 transition-all min-h-[46px] tracking-wide leading-snug">
    {text}
  </a>
);

// Komponen Khusus Biro di bawah Sekretaris Kabinet
const MiniBox = ({ text, link }) => (
  <a href={link} className="z-10 flex flex-col justify-center items-center bg-gradient-to-b from-[#c06b25] to-[#813504] border border-[#f3b177] rounded-[10px] px-2 py-1.5 shadow-sm text-white text-[9px] font-semibold text-center w-[95px] cursor-pointer hover:bg-[#d68037] hover:scale-105 transition-all leading-tight min-h-[38px]">
    {text}
  </a>
);

// --- BANTUAN GARIS PENGHUBUNG ---
const BranchLeft = ({ children, h="h-4" }) => (
  <div className="flex-1 flex flex-col items-center">
     <div className="flex w-full"><div className="flex-1"></div><div className="flex-1 border-t-2 border-[#f3b177]"></div></div>
     <div className={`w-[2px] ${h} bg-[#f3b177]`}></div>
     {children}
  </div>
);

const BranchRight = ({ children, h="h-4" }) => (
  <div className="flex-1 flex flex-col items-center">
     <div className="flex w-full"><div className="flex-1 border-t-2 border-[#f3b177]"></div><div className="flex-1"></div></div>
     <div className={`w-[2px] ${h} bg-[#f3b177]`}></div>
     {children}
  </div>
);

const BranchCenter = ({ children, h="h-4" }) => (
  <div className="flex-1 flex flex-col items-center">
     <div className="w-full border-t-2 border-[#f3b177]"></div>
     <div className={`w-[2px] ${h} bg-[#f3b177]`}></div>
     {children}
  </div>
);

// ========================================== //

export default function StrukturOrganisasi() {
  return (
    <div className="flex flex-col items-center bg-[#3c1001] p-8 w-full max-w-[1200px] mx-auto rounded-xl font-sans overflow-x-auto">

      {/* --- TINGKAT 1: PRESIDEN & WAKIL PRESIDEN --- */}
      <div className="flex flex-col items-center w-full">
         <Box text="Presiden & Wakil Presiden" link="/presiden" />
         <div className="w-[2px] h-6 bg-[#f3b177]"></div>
      </div>

      {/* --- TINGKAT 2: MIO (Manajemen Internal Organisasi) --- */}
      <div className="flex w-full">
         <div className="flex-1 flex justify-end items-center">
            <Box text="Manajemen Internal Organisasi (MIO)" link="/mio" />
            <div className="w-8 h-[2px] bg-[#f3b177]"></div>
         </div>
         <div className="w-[2px] bg-[#f3b177]"></div>
         <div className="flex-1"></div>
      </div>

      <div className="flex w-full">
         <div className="flex-1"></div>
         <div className="w-[2px] h-6 bg-[#f3b177]"></div>
         <div className="flex-1"></div>
      </div>

      {/* --- TINGKAT 3: KMI & SEKRETARIS KABINET --- */}
      <div className="flex w-full">
         {/* KMI (Tanpa Deputi di luar sesuai request) */}
         <BranchLeft h="h-5">
            <div className="flex flex-col items-center w-full">
               <Box text="Kantor Media Informasi (KMI)" link="/kmi" />
            </div>
         </BranchLeft>

         <div className="w-[2px] border-l-2 border-dashed border-[#f3b177]"></div>

         {/* SEKRETARIS KABINET (Tetap ada Biro Administrasi & Biro Keuangan) */}
         <BranchRight h="h-5">
            <div className="flex flex-col items-center w-full">
               <Box text="Sekretaris Kabinet" link="/sekretaris-kabinet" />
               <div className="w-[2px] h-4 bg-[#f3b177]"></div>
               <div className="flex w-[70%]">
                  <BranchLeft h="h-3"><MiniBox text="Biro Administrasi" link="/biro-administrasi" /></BranchLeft>
                  <BranchRight h="h-3"><MiniBox text="Biro Keuangan" link="/biro-keuangan" /></BranchRight>
               </div>
            </div>
         </BranchRight>
      </div>

      <div className="flex w-full h-8">
         <div className="flex-1"></div>
         <div className="w-[2px] border-l-2 border-dashed border-[#f3b177]"></div>
         <div className="flex-1"></div>
      </div>

      {/* --- TINGKAT 4: MENKO INTERNAL & MENKO EKSTERNAL --- */}
      <div className="flex w-full">
         
         {/* Menko Internal */}
         <BranchLeft h="h-5">
            <div className="flex flex-col items-center w-full">
               <Box text="Kementerian Koordinator Internal" link="/menko-internal" />
               <div className="w-[2px] h-4 bg-[#f3b177]"></div>
               <div className="flex w-[90%] justify-between">
                  <BranchLeft h="h-3"><Box text="Kementerian Dalam Negeri" link="/kemen-dagri" /></BranchLeft>
                  <BranchCenter h="h-3"><Box text="Kementerian Kaderisasi & PSDM" link="/kemen-psdm" /></BranchCenter>
                  <BranchRight h="h-3"><Box text="Kementerian Seni, Olahraga, & Budaya" link="/kemen-sob" /></BranchRight>
               </div>
            </div>
         </BranchLeft>

         <div className="w-[2px] border-l-2 border-dashed border-[#f3b177]"></div>

         {/* Menko Eksternal */}
         <BranchRight h="h-5">
            <div className="flex flex-col items-center w-full">
               <Box text="Kementerian Koordinator Eksternal" link="/menko-eksternal" />
               <div className="w-[2px] h-4 bg-[#f3b177]"></div>
               <div className="flex w-[80%] justify-between">
                  <BranchLeft h="h-3"><Box text="Kementerian Hubungan Luar" link="/kemen-hublu" /></BranchLeft>
                  <BranchRight h="h-3"><Box text="Kementerian Ekonomi Kreatif" link="/kemen-ekraf" /></BranchRight>
               </div>
            </div>
         </BranchRight>

      </div>

      {/* --- TINGKAT 5: MENKO SOSHUMPOL (Posisi di Bawah Sesuai Gambar Asli) --- */}
      <div className="flex w-full flex-col items-center mt-4">
         <div className="w-[2px] h-8 border-l-2 border-dashed border-[#f3b177]"></div>
         
         <div className="flex flex-col items-center w-[85%]">
             <Box text="Kementerian Koordinator Sosial, Hukum, & Politik" link="/menko-soshumpol" />
             <div className="w-[2px] h-4 bg-[#f3b177]"></div>
             <div className="flex w-full justify-between">
                
                <BranchLeft h="h-3">
                    <Box text="Kementerian Advokasi & Kesejahteraan Mahasiswa" link="/kemen-adkesma" />
                </BranchLeft>

                <BranchCenter h="h-3">
                    <Box text="Kementerian Kajian Aksi Propaganda" link="/kemen-kap" />
                </BranchCenter>

                <BranchRight h="h-3">
                    <Box text="Kementerian Sosial Masyarakat" link="/kemen-sosmas" />
                </BranchRight>

             </div>
         </div>
      </div>
      
    </div>
  );
}

defineProperties(StrukturOrganisasi, {});
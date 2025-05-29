// 📁 src/components/CreateCategoryModal.tsx
import { useState, type ChangeEvent } from "react"
import "./CreateCategoryModal.css"
import type { Dispatch, SetStateAction } from "react"

interface CreateCategoryModalProps {
  newCategory: string
  setNewCategory: (value: string) => void
  selectedAuthority: string[]
  setSelectedAuthority: Dispatch<SetStateAction<string[]>>
  onClose: () => void
  onSubmit: () => void
}

const CreateCategoryModal = ({
  newCategory,
  setNewCategory,
  selectedAuthority,
  setSelectedAuthority,
  onClose,
  onSubmit,
}: CreateCategoryModalProps) => {



const handleAuthoritySelect = (authority: string) => {
  setSelectedAuthority([authority]) // 단일 선택

}

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>게시판 생성</h3>
        <input
          type="text"
          value={newCategory}
          placeholder="게시판 이름"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
        />

      <div className="access-roles">
          <label>접근 권한 선택</label>
          <div className="authority-button-group">
            <button
              type="button"
              className={`authority-button ${selectedAuthority.includes("ROLE_Student") ? "active" : ""}`}
              onClick={() => handleAuthoritySelect("ROLE_Student")}
            >
              전체 열람 가능
            </button>
            <button
              type="button"
              className={`authority-button ${selectedAuthority.includes("ROLE_Graduate") ? "active" : ""}`}
              onClick={() => handleAuthoritySelect("ROLE_Graduate")}
            >
              졸업 후 열람 가능
            </button>
          </div>
        </div>

        <div className="modal-buttons">
          <button onClick={onSubmit}>생성</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;

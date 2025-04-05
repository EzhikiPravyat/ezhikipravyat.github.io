import cv2
import tkinter as tk
from PIL import Image, ImageTk
import threading

class VideoGame:
    def __init__(self, video_path):
        self.video_path = video_path
        self.root = tk.Tk()
        self.root.title("Video Game")
        self.root.resizable(False, False)
        self.root.geometry("600x550+500+500")
        
        # Создаем область для видео
        self.canvas = tk.Canvas(self.root, width=600, height=550)
        self.canvas.pack()
        
        # Переменные состояния
        self.is_playing = True
        self.cap = cv2.VideoCapture(video_path)
        self.stop_frame = 100
        self.counter = 0
        
        # Создаем элементы интерфейса
        self.question_label = tk.Label(self.root, text="сосал?", font=("Arial", 24))
        
        self.yes_button = tk.Button(self.root, text="Да", command=self.yes_action, 
                                  state='disabled', font=("Arial", 20),
                                  width=20, height=10)
        self.no_button = tk.Button(self.root, text="Нет", command=self.no_action, 
                                 state='disabled', font=("Arial", 20),
                                 width=20, height=10)
        self.back_button = tk.Button(self.root, text="Назад", command=self.reset_game,
                                   state='disabled', font=("Arial", 16),
                                   width=10, height=2)
        self.counter_label = tk.Label(self.root, text=f"Отсосал {self.counter} раз(а)", 
                                    font=("Arial", 16))
        
        self.show_button = tk.Button(self.root, text="ПОКАЖИ ПРИЗ СКОРЕЕ", command=self.show_surprise,
                                  state='disabled', font=("Arial", 20),
                                  width=20, height=10)
        
        # Загружаем изображения
        self.screenshot = Image.open("Screenshot_1.png")
        self.screenshot = self.screenshot.resize((600, 550))
        self.screenshot_photo = ImageTk.PhotoImage(self.screenshot)

        self.screenshot2 = Image.open("Screenshot_2.png")
        self.screenshot2 = self.screenshot2.resize((600, 550))
        self.screenshot_photo2 = ImageTk.PhotoImage(self.screenshot2)
        
        self.screenshot3 = Image.open("Screenshot_3.png")
        self.screenshot3 = self.screenshot3.resize((600, 550))
        self.screenshot_photo3 = ImageTk.PhotoImage(self.screenshot3)

        self.screenshot4 = Image.open("Screenshot_4.png")
        self.screenshot4 = self.screenshot4.resize((600, 550))
        self.screenshot_photo4 = ImageTk.PhotoImage(self.screenshot4)

        self.screenshot5 = Image.open("Screenshot_5.png")
        self.screenshot5 = self.screenshot5.resize((600, 550))
        self.screenshot_photo5 = ImageTk.PhotoImage(self.screenshot5)
        
        # Размещаем счетчик
        self.canvas.create_window(100, 30, window=self.counter_label)
        
        # Запускаем видео
        self.thread = threading.Thread(target=self.play_video)
        self.thread.daemon = True
        self.thread.start()
        
        self.root.mainloop()
    
    def play_video(self):
        frame_count = 0
        
        while self.cap.isOpened() and self.is_playing:
            ret, frame = self.cap.read()
            if not ret:
                break
                
            frame_count += 1
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            img = Image.fromarray(frame_rgb)
            photo = ImageTk.PhotoImage(image=img)
            
            self.canvas.create_image(0, 0, image=photo, anchor=tk.NW)
            self.canvas.image = photo
            
            if frame_count == self.stop_frame:
                self.show_interface()
                break
                
            self.root.update()
            cv2.waitKey(30)
        
        if frame_count < self.stop_frame:
            self.cap.release()
            self.root.quit()
    
    def show_interface(self):
        self.is_playing = False
        self.canvas.create_window(300, 50, window=self.question_label)
        self.canvas.create_window(150, 375, window=self.yes_button, width=300, height=275)
        self.canvas.create_window(450, 375, window=self.no_button, width=300, height=275)
        self.yes_button.config(state='normal')
        self.no_button.config(state='normal')
    
    def yes_action(self):
        self.canvas.delete("all")
        self.counter += 1
        self.counter_label.config(text=f"Отсосал {self.counter} раз")
        
        if self.counter == 1:
            self.canvas.create_image(0, 0, image=self.screenshot_photo5, anchor=tk.NW)
            # self.text = f'ничего себе \n ты уже отсосал {self.counter} раз(а). \n Ты заслужил приз!'
            # self.question_label2 = tk.Label(self.root, text=self.text, font=("Arial", 24))
            # self.canvas.create_window(300, 200, window=self.question_label2)
            # self.canvas.create_window(300, 375, window=self.show_button, width=400, height=100)
            # self.show_button.config(state='normal')
        else:
            self.canvas.create_image(0, 0, image=self.screenshot_photo, anchor=tk.NW)
        
        self.canvas.create_window(550, 500, window=self.back_button, width=100, height=50)
        # Воссоздаем счетчик после очистки
        self.canvas.create_window(100, 30, window=self.counter_label)
        self.yes_button.config(state='disabled')
        self.no_button.config(state='disabled')
        self.back_button.config(state='normal')
    
    def no_action(self):
        self.canvas.delete("all")
        self.canvas.create_image(0, 0, image=self.screenshot_photo2, anchor=tk.NW)
        self.canvas.create_window(550, 500, window=self.back_button, width=100, height=50)
        # Воссоздаем счетчик после очистки
        self.canvas.create_window(100, 30, window=self.counter_label)
        self.yes_button.config(state='disabled')
        self.no_button.config(state='disabled')
        self.back_button.config(state='normal')

    def show_surprise(self):
        # self.canvas.delete("all")
        # self.canvas.create_image(0, 0, image=self.screenshot_photo4, anchor=tk.NW)
        # self.canvas.create_window(550, 500, window=self.back_button, width=100, height=50)
        # # Воссоздаем счетчик после очистки
        # self.canvas.create_window(100, 30, window=self.counter_label)
        # self.yes_button.config(state='disabled')
        # self.no_button.config(state='disabled')
        # self.show_button.config(state='disabled')
        # self.back_button.config(state='normal')
        pass
    
    def reset_game(self):
        self.canvas.delete("all")
        self.is_playing = True
        self.back_button.config(state='disabled')
        self.cap = cv2.VideoCapture(self.video_path)
        # Воссоздаем счетчик после очистки
        self.canvas.create_window(100, 30, window=self.counter_label)
        self.thread = threading.Thread(target=self.play_video)
        self.thread.daemon = True
        self.thread.start()

    def __del__(self):
        if self.cap.isOpened():
            self.cap.release()

if __name__ == "__main__":
    game = VideoGame("video.mp4")
import sys
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QPushButton, QVBoxLayout, QHBoxLayout
from PyQt5.QtCore import QTimer, QTime

class Stopwatch(QWidget):
    def __init__(self):
        super().__init__()
        self.time = QTime(0, 0, 0, 0)
        self.time_label = QLabel("00:00:00.00")
        self.start_button = QPushButton("Start", self)
        self.stop_button = QPushButton("Stop", self)
        self.reset_button = QPushButton("Reset", self)
        self.timer = QTimer(self)
        self.initUI()

    def initUI(self):
        self.setWindowTitle("Stopwatch")
        vbox = QVBoxLayout()
        vbox.addWidget(self.time_label)
        self.setLayout(vbox)

        hbox = QHBoxLayout()
        hbox.addWidget(self.start_button)
        hbox.addWidget(self.stop_button)
        hbox.addWidget(self.reset_button)
        vbox.addLayout(hbox)

        self.start_button.setObjectName("startButton")
        self.stop_button.setObjectName("stopButton")
        self.reset_button.setObjectName("resetButton")

        self.setStyleSheet("""
            QPushButton {
                color: white;
                border: none;
                font-weight: bold;
                border-radius: 10px;
                padding: 15px 30px;
                font-size: 24px;
                font-family: 'Arial';
                transition: background-color 0.5s;
            }
            QPushButton:pressed {
                opacity: 0.8;
            }
                           
            #startButton {
                background-color: hsl(115,100%,40%);
            }
            #startButton:hover {
                background-color: hsl(115,100%,30%);
            }

            #stopButton {
                background-color: hsl(10,90%,50%);
            }
            #stopButton:hover {
                background-color: hsl(10,90%,40%);
            }
            #resetButton {
                background-color: hsl(205,90%,60%);
            }
            #resetButton:hover {
                background-color: hsl(205,90%,60%);
            }

            QLabel {
                font-size: 120px;
                font-family: 'Courier New';
                color: #2c3e50;
                background-color: hsl(195,100%,95%);
                border: 2px solid #bdc3c7;
                border-radius: 20px;
                padding: 20px;
                text-align: center;
            }
        """)
        self.start_button.clicked.connect(self.start)
        self.stop_button.clicked.connect(self.stop)
        self.reset_button.clicked.connect(self.reset)
        self.timer.timeout.connect(self.update_display)


    def start(self):
        self.timer.start(10)

    def stop(self):
        self.timer.stop()

    def reset(self):
        self.timer.stop()
        self.time = QTime(0, 0, 0, 0)
        self.time_label.setText(self.format_time(self.time))

    def format_time(self,time):
        hours = time.hour()
        minutes = time.minute()
        seconds = time.second()
        milliseconds = time.msec() // 10
        return f"{hours:02}:{minutes:02}:{seconds:02}.{milliseconds:02}"
    
    def update_display(self):
        self.time = self.time.addMSecs(10)
        self.time_label.setText(self.format_time(self.time))

if __name__ == "__main__":
    app = QApplication(sys.argv)
    stopwatch = Stopwatch()
    stopwatch.show()
    sys.exit(app.exec_())